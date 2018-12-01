// @flow
import { connect } from 'react-redux'

import CommitList from 'components/CommitList'

const mapStateToProps = (state: ReduxProps, ownProps: OwnProps) => ({
  logs: state.logs,
  ...ownProps,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommitList)
