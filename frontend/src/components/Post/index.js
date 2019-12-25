import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../store/actions/postActions';
import AddComment from './AddComment';
import AllComment from './AllComment';

class Post extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;

		this.props.getPost(id);
	}

	render() {
		const { post, loading } = this.props.post;
		const { comments } = post;
		return (
			post === null || loading ? (
        <div>
          Loading Post...
        </div>
      ) : (
        <div>
          <p>{post.text}</p>
          <AddComment postID={post._id} />

          {comments ? (
            comments.map((comment) => <AllComment postID={post._id} key={comment._id} comment={comment} />)
          ) : (
            <h1>Loading Comment</h1>
          )}
        </div>
      )
		);
	}
}

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
