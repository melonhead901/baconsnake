document.addEventListener 'DOMContentLoaded', ->
  ace = require('brace')
  require('brace/mode/coffee')
  require('brace/mode/html')
  require('brace/mode/css')
  require('brace/theme/monokai')

  makeEditor = (id, mode) ->
    editor = ace.edit(id)
    editor.getSession().setMode("ace/mode/#{mode}")
    editor.setTheme('ace/theme/monokai')
    return editor

  makeEditor('editor-coffee', 'coffee')
  window.ed = htmlEditor = makeEditor('editor-html', 'html')
  makeEditor('editor-css', 'css')

  htmlEditor.getSession().on 'change', ->
    document.querySelector('#output').innerHTML = htmlEditor.getSession().getValue()