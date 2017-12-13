export function connectToSocketServer(url) {
  return {
    type: this.connectToSocketServer.name,
    payload: {
      url,
    }
  }
}

export function changeCurrentTabs(tabs) {
  return {
    type: this.changeCurrentTabs.name,
    payload: {
      tabs,
    }
  }
}

export function initalizeEnquete() {
  return {
    type: this.initalizeEnquete.name,
  }
}

export function updateCurrentQuestions(subject, questions) {
  return {
    type: this.updateCurrentQuestions.name,
    payload: {
      subject,
      questions,
    }
  }
}

export function emitQuestions(subject, questions) {
  return {
    type: this.emitQuestions.name,
    payload: {
      subject,
      questions,
    }
  }
}

export function startAnswer() {
  return {
    type: this.startAnswer.name,
  }
}

export function stopAnswer() {
  return {
    type: this.stopAnswer.name,
  }
}

export function submitAnswer(index) {
  return {
    type: this.submitAnswer.name,
    payload: {
      index,
    }
  }
}

export function updateResult(results) {
  return {
    type: this.updateResult.name,
    payload: {
      results,
    }
  }
}
