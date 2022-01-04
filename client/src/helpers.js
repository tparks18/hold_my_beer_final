const getRank=(upVotes, downVotes)=>{
    switch(true){
        case (upVotes+downVotes > 100):
            return "Voting God!  Didn't you realize this is just a Demo Site?";
        case (upVotes+downVotes === 0):
            return "N00b Get To Voting!";
        case (upVotes+downVotes <= 5):
            return "Just getting warmed up.  Keep Calm Vote On!";
        case (upVotes/downVotes == .5):
            return "Riding the Fence.  You see the good and the bad.";
        case (upVotes/downVotes > .5):
            return "Positive Pansy.  You are easily impressed, I bet your friends love you!";
        case (upVotes/downVotes < .5):
            return "Harsh Critic.  You are not impressed. Que McKayla Maroney";

    }

}

export{
    getRank
}