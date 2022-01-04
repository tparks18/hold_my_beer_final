from flask import Flask, make_response, request, g, abort
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime as dt, timedelta
import secrets
from flask_cors import CORS


class Config():
    SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = os.environ.get(
        "SQLALCHEMY_TRACK_MODIFICATIONS")


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()
cors = CORS(app)


@basic_auth.verify_password
def verify_password(email, password):
    u = User.query.filter_by(email=email.lower()).first()
    if u is None:
        return False
    g.current_user = u
    return u.check_hashed_password(password)


@token_auth.verify_token
def verify_token(token):
    u = User.check_token(token) if token else None
    g.current_user = u
    return g.current_user or None


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, index=True, unique=True)
    name = db.Column(db.String)
    password = db.Column(db.String)
    facebook_link = db.Column(db.String)
    instagram_link = db.Column(db.String)
    twitter_link = db.Column(db.String)
    bio = db.Column(db.Text)
    img = db.Column(db.String)
    location = db.Column(db.String)
    created_on = db.Column(db.DateTime, default=dt.utcnow)
    modified_on = db.Column(db.DateTime, onupdate=dt.utcnow)
    token = db.Column(db.String, index=True, unique=True)
    token_exp = db.Column(db.DateTime)
    videos = db.relationship("Video", backref="creator",
                             lazy="joined", cascade='all, delete-orphan')
    votes = db.relationship("Vote", backref="voter",
                            lazy="dynamic", cascade='all, delete-orphan')

    def get_token(self, exp=86400):
        current_time = dt.utcnow()
        if self.token and self.token_exp > current_time + timedelta(seconds=60):
            return self.token
        self.token = secrets.token_urlsafe(32)
        self.token_exp = current_time + timedelta(seconds=exp)
        self.save()
        return self.token

    def revoke_token(self):
        self.token_exp = dt.utcnow() - timedelta(seconds=61)

    @staticmethod
    def check_token(token):
        u = User.query.filter_by(token=token).first()
        if not u or u.token_exp < dt.utcnow():
            return None
        return u

    def hash_password(self, original_password):
        return generate_password_hash(original_password)

    def check_hashed_password(self, login_password):
        return check_password_hash(self.password, login_password)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<{self.user_id}|{self.email}>'

    def from_dict(self, data):
        for field in ["email", "password", "facebook_link", "instagram_link", "twitter_link", "location", "name", "bio", "img"]:
            if field in data:
                if field == "password":
                    setattr(self, field, self.hash_password(data[field]))
                else:
                    setattr(self, field, data[field])

    def register(self, data):
        self.email = data['email']
        self.password = self.hash_password(data['password'])
        self.location = data['location']
        self.name = data['name']

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "email": self.email,
            "created_on": self.created_on,
            "modified_on": self.modified_on,
            "facebook_link": self.facebook_link,
            "instagram_link": self.instagram_link,
            "twitter_link": self.twitter_link,
            "location": self.location,
            "name": self.name,
            "bio": self.bio,
            "img": self.img
        }


class Vote(db.Model):
    vote_id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.Integer, db.ForeignKey('video.video_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    vote = db.Column(db.Boolean())
    created_on = db.Column(db.DateTime, default=dt.utcnow)
    modified_on = db.Column(db.DateTime, onupdate=dt.utcnow)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<{self.vote_id}|{self.vote}>'

    def from_dict(self, data):
        self.video_id = data['video_id']
        self.user_id = data['user_id']
        self.vote = data['vote']

    def to_dict(self):
        return {
            "vote_id": self.vote_id,
            "video_id": self.video_id,
            "user_id": self.user_id,
            "vote": self.vote,
            "created_on": self.created_on,
            "modified_on": self.modified_on,
        }


class Video(db.Model):
    video_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    cloud_id = db.Column(db.String)
    thumbnail_url = db.Column(db.String)
    created_on = db.Column(db.DateTime, default=dt.utcnow)
    modified_on = db.Column(db.DateTime, onupdate=dt.utcnow)
    user_id = db.Column(db.ForeignKey('user.user_id'))
    votes = db.relationship("Vote", backref="vid",
                            lazy="dynamic", cascade='all, delete-orphan')

    @property
    def up_votes(self):
        return Vote.query.filter(Vote.video_id == self.video_id, Vote.vote == True).count()

    @property
    def down_votes(self):
        return Vote.query.filter(Vote.video_id == self.video_id, Vote.vote == False).count()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<{self.video_id}|{self.title}>'

    def from_dict(self, data):
        self.title = data['title']
        self.user_id = data['user_id']
        self.cloud_id = data['cloud_id']
        self.thumbnail_url = data['thumbnail_url']

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "title": self.title,
            "video_id": self.video_id,
            "created_on": self.created_on,
            "modified_on": self.modified_on,
            'cloud_id': self.cloud_id,
            "thumbnail_url": self.thumbnail_url,
            'up_votes': self.up_votes,
            'down_votes': self.down_votes,
            'creator_name': self.creator.name,
            'creator_id': self.creator.user_id,
            'creator_email': self.creator.email,
            "creator_bio": self.creator.bio,
            "creator_img": self.creator.img
        }


    ##############
    # API ROUTES #
    ##############
'''
    Responses:
    200 : Everything went well
    401 : Invalid Token, or invalid Username/Password,
    403 : User not authorized for action
    404 : Resource not found
    409 : For use if a video user combo already has a vote on the post route (use put to change the vote)
    500 : Server Side Error
'''


@app.get('/login')
@basic_auth.login_required()
def login():
    '''
        BasicAuth: base64encoded string=> user_name:password
        Authorization: Basic base64encoded_string
        returns user information including token
    '''
    data = g.current_user.to_dict()
    data.update({'token': g.current_user.get_token()})
    return make_response(data, 200)


@app.get('/user')
@token_auth.login_required()
def get_users():
    '''
        TokenAuth: Bearer TOKEN
        returns all Users information (without token)
    '''
    return make_response({"users": [user.to_dict() for user in User.query.all()]}, 200)


@app.get('/user/<int:user_id>')
@token_auth.login_required()
def get_user(user_id):
    '''
        TokenAuth: Bearer TOKEN
        returns user_id's information (without token)
    '''
    return make_response(User.query.get(user_id).to_dict(), 200)


@app.post('/user')
def post_user():
    '''
        No Auth
        creates a new user.
        expected payload:
        {
            "email" : STRING,
            "name" : STRING,
            "password" : STRING,
            "location" : STRING
        }
    '''
    data = request.get_json()
    if User.query.filter_by(email=data.get('email')).first():
        abort(422)
    new_user = User()
    new_user.register(data)
    new_user.save()
    return make_response("success", 200)


@app.put('/user/<int:user_id>')
@token_auth.login_required()
def put_user(user_id):
    '''
        Can only be used by the user with <user_id>

        TokenAuth: Bearer TOKEN
        updates user with <user_id>
        expected payload (does not need to include all key value pairsAny omitted values will remain unchanged):
        {
            "email" : STRING,
            "password" : STRING,
            "name" : STRING,
            "location" : STRING
            "facebook_link" : STRING,
            "instagram_link" : STRING,
            "twitter_link" : STRING
        }
    '''
    data = request.get_json()
    if user_id != g.current_user.user_id:
        return abort(403)
    u = User.query.get(user_id)
    u.from_dict(data)
    u.save()
    return make_response("success", 200)


@app.delete('/user/<int:user_id>')
@token_auth.login_required()
def delete_user(user_id):
    '''
        Can only be used by the user with <user_id>

        TokenAuth: Bearer TOKEN
        Will delete User with <user_id>
    '''
    if user_id != g.current_user.user_id:
        return abort(403)
    User.query.get(user_id).delete()
    return make_response("success", 200)


@app.get('/video')
def get_videos():
    '''
        No Auth

        returns All Videos information
    '''
    return make_response({"videos": [video.to_dict() for video in Video.query.all()]}, 200)


@app.get('/video/<int:video_id>')
def get_video(video_id):
    '''
        No Auth

        returns Video with <video_id>'s information
    '''
    return make_response(Video.query.get(video_id).to_dict(), 200)


@app.post('/video')
@token_auth.login_required()
def post_video():
    '''
        Creates a video for the user with the corresponding Token

        TokenAuth: Bearer TOKEN
        creates a new video.

        expected payload:
        {
            "title" : STRING,
            "cloud_id" : INT,
        }
    '''
    data = request.get_json()
    data.update({"user_id": g.current_user.user_id})
    new_video = Video()
    new_video.from_dict(data)
    new_video.save()
    return make_response("success", 200)


@app.put('/video/<int:video_id>')
@token_auth.login_required()
def put_video(video_id):
    '''
        Can only be used by the user with user_id belonging to the token

        TokenAuth: Bearer TOKEN
        Updates video's information.

        expected payload:
        {
            "title" : STRING,
            "cloud_id" : INT,
        }
    '''
    data = request.get_json()
    data.update({'user_id': g.current_user.user_id})
    video = Video.query.get(video_id)
    if video.user_id != g.current_user.user_id:
        return abort(403)
    video.from_dict(data)
    video.save()
    return make_response("success", 200)


@app.delete('/video/<int:video_id>')
@token_auth.login_required()
def delete_video(video_id):
    '''
        Can only be used by the video owner's token

        TokenAuth: Bearer TOKEN
        Will delete Video with <video_id>
    '''
    vid = Video.query.get(video_id)
    if vid.user_id != g.current_user.user_id:
        return abort(403)
    vid.delete()
    return make_response("success", 200)


@app.get('/video/user/<int:user_id>')
def get_videos_by_user_id(user_id):
    '''
        No Auth

        Will Return a list of All video objects created by user with <user_id> with the video's information
    '''
    return make_response({"videos": [video.to_dict() for video in User.query.get(user_id).videos]}, 200)


@app.get('/vote')
def get_votes():
    '''
        No Auth

        Will Return a list of All vote information
    '''
    return make_response({"votes": [vote.to_dict() for vote in Vote.query.all()]}, 200)


@app.get('/vote/<int:vote_id>')
def get_vote(vote_id):
    '''
        No Auth

        Will Return vote information for vote with id <vote_id>
    '''
    return make_response(Vote.query.filter_by(vote_id=vote_id).first().to_dict(), 200)


@app.post('/vote')
@token_auth.login_required()
def post_vote():
    '''
        TokenAuth: Bearer TOKEN
        creates a new vote for the user owning the token.
        Will also Update a vote
        an upvote is saved as True and downvote is saved as False

        expected payload:
        {
            "video_id" : INT,
            "vote" : BOOL,
        }
    '''
    data = request.get_json()
    data.update({'user_id': g.current_user.user_id})
    already_voted = Vote.query.filter_by(
        user_id=g.current_user.user_id, video_id=data['video_id']).first()

    new_vote = already_voted if already_voted else Vote()

    new_vote.from_dict(data)
    new_vote.save()
    return make_response("success", 200)


@app.put('/vote/<int:vote_id>')
@token_auth.login_required()
def put_vote(vote_id):
    '''
        TokenAuth: Bearer TOKEN
        updates vote for the user owning the token.
        an upvote is saved as True and downvote is saved as False, to remove vote set vote to null/None

        expected payload:
        {
            "video_id" : INT,
            "vote" : BOOL,
        }
    '''
    data = request.get_json()
    data.update({'user_id': g.current_user.user_id})
    vote = Vote.query.get(vote_id)
    if vote.user_id != g.current_user.user_id:
        abort(403)
    if data['vote'] == None:
        vote.delete()
        return make_response("success", 200)
    vote.from_dict(data)
    vote.save()
    return make_response("success", 200)


@app.delete('/vote/<int:vote_id>')
@token_auth.login_required()
def delete_vote(vote_id):
    '''
        Can only be used by the votes owner's token

        TokenAuth: Bearer TOKEN
        Will delete vote with <vote_id>
    '''
    vote = Vote.query.get(vote_id)
    if vote.user_id != g.current_user.user_id:
        abort(403)
    vote.delete()
    return make_response("success", 200)


@app.get('/vote/user/<int:user_id>')
def get_votes_for_user(user_id):
    '''
        Return Voting history of user with <user_id>
    '''
    return make_response({"votes": [vote.to_dict() for vote in Vote.query.filter_by(user_id=user_id).all()]}, 200)


@app.get('/vote/user/video/<int:user_id>/<int:video_id>')
def get_vote_by_user_for_video(user_id, video_id):
    '''
        No Auth.  Returns vote information for a specific video user combo
    '''
    vote = Vote.query.filter_by(video_id=video_id, user_id=user_id).first()
    if not vote:
        abort(404)
    return make_response(vote.to_dict(), 200)


@app.get('/vote/user/video/<int:user_id>')
def get_votes_video_titles_for_user(user_id):
    '''
        Return Voting history of user with <user_id> with attached information of the Videos
    # '''
    votes = Vote.query.filter_by(user_id=user_id).join(Video, Vote.video_id == Video.video_id).with_entities(
        Vote.vote_id, Vote.video_id, Vote.created_on, Vote.modified_on, Video.title, Video.cloud_id, Vote.vote, Video.thumbnail_url).all()

    def make_dict(list_element):
        return {
            "vote_id": list_element[0],
            "video_id": list_element[1],
            "created_on": list_element[2],
            "modified_on": list_element[3],
            "video_title": list_element[4],
            "video_cloud_id": list_element[5],
            "vote": list_element[6],
            "thumbnail_url": list_element[7],
        }
    return make_response({"votes": [make_dict(vote) for vote in votes]}, 200)


if __name__ == "__main__":
    app.run(debug=True)
