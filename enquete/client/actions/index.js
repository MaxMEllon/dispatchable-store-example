import createAction from './creator'

import store from '../stores'

export const connectToSocketServer = createAction('connectToSocketServer')
export const changeCurrentTabs = createAction('changeCurrentTabs')
export const initalizeEnquete = createAction('initalizeEnquete')
export const updateCurrentQuestions = createAction('updateCurrentQuestions')
export const emitQuestions = createAction('emitQuestions')
export const startAnswer = createAction('startAnswer')
export const stopAnswer = createAction('stopAnswer')
export const submitAnswer = createAction('submitAnswer')
export const updateResult = createAction('updateResult')
