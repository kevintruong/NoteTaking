import React from 'react'
import { connect } from 'react-redux'
import { updateNote } from '../action/Note'
import Editor from '../components/Editor'
import Input from '../components/Input'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'

const NoteView = ({title, content, updateNoteContent, updateNoteTitle}) => (
  <div>
    <Input
      value={title || ''}
      onChange={updateNoteTitle}
      style={styles.title}
    />
    <Editor
      editorState={content && EditorState.createWithContent(convertFromRaw(content))}
      onChange={updateNoteContent}
    />
  </div>
)

const styles = {
  title: {
    marginBottom: '10px'
  }
}

const mapDispatchToProps = (dispatch, { note }) => {
  return {
    updateNoteContent: (newContent) => {
      if (note) {
        const updatedNote = {
          ...note,
          content: convertToRaw(newContent.getCurrentContent())
        }
        dispatch(updateNote(updatedNote, note.id))
      }
    },
    updateNoteTitle: (e) => {
      if (note) {
        dispatch(updateNote({
          ...note,
          title: e.target.value
        }, note.id))
      }
    },
    ...note
  }
}

export default connect(null, mapDispatchToProps)(NoteView)
