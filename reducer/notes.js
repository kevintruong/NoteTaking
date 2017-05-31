import { UPDATE_NOTE, ADD_NEW_NOTE } from '../action'
import { convertToRaw, ContentState } from 'draft-js'

const initState = {
  211: {
    id: '211',
    title: 'Nhan',
    createdDate: 'Today',
    content: convertToRaw(ContentState.createFromText('This is note 1')),
    book_id: '123'
  },
  222: {
    id: '222',
    title: 'Nhan 2',
    createdDate: 'Yesterday',
    content: convertToRaw(ContentState.createFromText('This is note 2')),
    book_id: '123'
  },
  223: {
    id: '223',
    title: 'Nhan 3',
    createdDate: 'Yesterday',
    content: convertToRaw(ContentState.createFromText('This is note 3')),
    book_id: '111'
  }
}

const notes = (state = initState, action) => {
  switch(action.type) {
    case UPDATE_NOTE:
      return {
        ...state,
        [action.noteId]: action.updatedNote
      }
    case ADD_NEW_NOTE:
      debugger
      return {
        ...state,
        [action.noteId]: action.note
      }
    default:
      return state
  }
}

export default notes
