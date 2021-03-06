import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { createSelector } from 'reselect'
import BEMHelper from 'react-bem-helper'

import PostTeaser from './PostTeaser'

const bem = BEMHelper('post-teaser-list')

const PostTeaserList = ({ postTeaserList, flows }) => (
  <div {...bem('')}>
    <div>
      <Link to="/post/add">Добавить</Link>
      <span> | </span>
      <Link to="/feedback">Обратная связь</Link>
    </div>
    <div {...bem('flow-list')}>
      <ul>
        {Object.keys(flows).map(key =>
          <li key={key}>
            <Link to={`/flows/${key}`}>{flows[key].name}</Link>
          </li>
        )}
      </ul>
    </div>
    <div {...bem('main')}>
      {postTeaserList.map((postTeaser) => (
        <PostTeaser key={postTeaser.id} {...postTeaser}/>
      ))}
    </div>
  </div>
)

const getSelectedFlow = (state, ownProps) =>
  ownProps.params.selectedFlow

const getPostTeaserList = (state) =>
  state.posts

const filteredPostTeaserList = createSelector(
  [getPostTeaserList, getSelectedFlow],
  (posts, selectedFlow) => {
    if (selectedFlow) {
      return posts.filter(element =>
        element.flow.id === selectedFlow)
    } else {
      return posts
    }
  }
)

const mapStateToProps = (state, ownProps) => {
  return {
    postTeaserList: filteredPostTeaserList(state, ownProps),
    flows: state.flows
  }
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PostTeaserList)
