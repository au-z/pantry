import { createEditor, Editor, Node, Range, Operation, Path, Transforms } from 'slate'
import { define, dispatch, html } from 'hybrids'
import { getset } from '@auzmartist/hybrids-helpers'
import { throttle } from 'lodash'

export interface SlateEditor extends Editor {
  insertData: (data: DataTransfer) => void
}

const NODE_TO_KEY: WeakMap<Node, string> = new WeakMap()

export const EditorHelper = {
  findKey(node: Node): string {
    let key = NODE_TO_KEY.get(node)
    if (!key) {
      key = Math.random().toString(16).substring(2, 5)
      NODE_TO_KEY.set(node, key)
    }

    return key
  },
  getKey(node: Node): string {
    let key = NODE_TO_KEY.get(node)
    if (!key) {
      throw new Error(`Unable to find key for Slate node. ${JSON.stringify(node)}`)
    }
    return key
  },
}

export const withHybrids = <T extends Editor>(editor: T) => {
  const e = editor as T & SlateEditor
  const { apply, onChange } = e

  e.apply = (op: Operation) => {
    const matches: [Path, string][] = []

    switch (op.type) {
      case 'insert_text':
      case 'remove_text':
      case 'set_node': {
        for (const [node, path] of Editor.levels(e, { at: op.path })) {
          const key = EditorHelper.findKey(node)
          matches.push([path, key])
        }
        break
      }

      case 'insert_node':
      case 'remove_node':
      case 'merge_node':
      case 'split_node': {
        for (const [node, path] of Editor.levels(e, {
          at: Path.parent(op.path),
        })) {
          const key = EditorHelper.findKey(node)
          matches.push([path, key])
        }
        break
      }

      case 'move_node': {
        // TODO
        break
      }
    }

    apply(op)

    for (const [path, key] of matches) {
      const [node] = Editor.node(e, path)
      NODE_TO_KEY.set(node, key)
    }
  }

  e.insertData = (data: DataTransfer) => {
    const fragment = data.getData('application/x-slate-fragment')

    if (fragment) {
      const decoded = decodeURIComponent(window.atob(fragment))
      const parsed = JSON.parse(decoded) as Node[]
      e.insertFragment(parsed)
      return
    }

    const text = data.getData('text/plain')

    if (text) {
      const lines = text.split(/\r\n|\r|\n/)
      let split = false

      for (const line of lines) {
        if (split) {
          Transforms.splitNodes(e, { always: true })
        }

        e.insertText(line)
        split = true
      }
    }
  }

  e.onChange = () => {}

  return e
}

// TODO
const HAS_BEFORE_INPUT_SUPPORT = true

export interface SlateEditorElement extends HTMLElement {
  value: Node[]
  oldSelection: Range
  editor: SlateEditor
  readonly: boolean
  autocorrect: 'on' | 'off'
  autocapitalize: 'none' | 'on' | 'words' | 'characters'
}
type H = SlateEditorElement

export const SlateEditor = define<H>({
  tag: 'slate-editor',
  value: getset<H, Node[]>(undefined),
  oldSelection: getset(undefined), //
  editor: {
    connect: (host, key, invalidate) => {
      function onContextChange(value: Node[]) {
        if (value != host.value) {
          host.value = value
          dispatch(host, 'valueChange', { detail: editor.selection, bubbles: true, composed: true })
        } else if (host.oldSelection != editor.selection) {
          host.oldSelection = editor.selection
          updateSelection()
          dispatch(host, 'selectionChange', { detail: editor.selection, bubbles: true, composed: true })
        }
      }

      function updateSelection() {}

      // constructor
      const editor = withHybrids(createEditor())
      editor.children = [{ children: [{ text: '' }] }]

      // connect
      document.addEventListener(
        'selectionchange',
        throttle(() => {
          host.onDOMSelectionChange()
        }, 100)
      )

      // firstUpdated
      editor.onChange = () => {
        onContextChange(editor.children)
      }

      host[key] = editor
      return () => {
        // dispose of slate
      }
    },
  },
  readonly: false,
  autocorrect: () => (HAS_BEFORE_INPUT_SUPPORT ? 'on' : 'off'),
  autocapitalize: 'none',
  // decorate: ,
  // renderElement: ,
  // renderLeaf: ,
  // decorations: ,
  // prettier-ignore
  render: (h: H) => html`<div
    class="slate-editor"
    spellcheck="${spellcheck}"
    autocorrect="${h.autocorrect}"
    autocapitalize="${HAS_BEFORE_INPUT_SUPPORT ? h.autocapitalize : 'none'}"
    contenteditable="${h.readonly}"
    onbeforeinput="${onbeforeinput}"
    onfocus="${onfocus}"
    onblur="${onblur}"
    onclick="${onclick}"
  >${renderChildren(h)}</div>`,

  state: getset({
    isComposing: false,
    isUpdating
  })
  //
  onDOMSelectionChange: (host: H) => () => {
    if(!host.readonly && !host.state.isComposing && !host.state.isUpdatingSelection)
    console.log('onDOMSelectionChange: unimplemented')
  },
})

function onbeforeinput(host, e) {
  console.log(`onbeforeinput: unimplemented`)
}

function onfocus(host, e) {
  console.log(`onfocus: unimplemented`)
}

function onblur(host, e) {
  console.log(`onblur: unimplemented`)
}

function onclick(host, e) {
  console.log(`onclick: unimplemented`)
}

function renderChildren(host: H) {}

function spellcheck(host, e) {}
