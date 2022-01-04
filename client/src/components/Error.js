import React from 'react'
const styles = {
    error: { color: "red" }
  };

export default function Error(props) {
    return (<div style={styles.error}>{props.error}</div>)
}
