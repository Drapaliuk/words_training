export const authorizationSelectors = {
    isAuthorization: state => state.authorization.isAuthorization,
    getUserId: state => state.authorization.userId
}