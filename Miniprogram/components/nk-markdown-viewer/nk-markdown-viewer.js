Component({
  properties: {
    content: { type: String, value: '' },
    src: { type: String, value: '' },
  },
  data: {
    renderedNodes: [],
    error: false,
  },
  observers: {
    'content': function (val) {
      if (val) this.renderMarkdown(val)
    },
    'src': function (val) {
      if (val) this.fetchMarkdown(val)
    },
  },
  lifetimes: {
    attached() {
      if (this.data.content) this.renderMarkdown(this.data.content)
      else if (this.data.src) this.fetchMarkdown(this.data.src)
    },
  },
  methods: {
    fetchMarkdown(url) {
      wx.request({
        url: url,
        success: (res) => {
          if (res.statusCode === 200) {
            this.renderMarkdown(res.data)
          } else {
            this.setData({ error: true })
          }
        },
        fail: () => this.setData({ error: true }),
      })
    },
    renderMarkdown(md) {
      try {
        const html = this.simpleMarkdown(md)
        const nodes = this.htmlToNodes(html)
        this.setData({ renderedNodes: nodes, error: false })
      } catch {
        this.setData({ error: true })
      }
    },
    simpleMarkdown(text) {
      let html = text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      // headings
      html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
      html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
      html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')
      // bold & italic
      html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
      // inline code
      html = html.replace(/`(.+?)`/g, '<code>$1</code>')
      // links
      html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
      // images
      html = html.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" />')
      // paragraphs
      html = html.replace(/\n\n/g, '</p><p>')
      html = '<p>' + html + '</p>'
      html = html.replace(/<p><\/p>/g, '')
      // hr
      html = html.replace(/^---$/gm, '<hr/>')
      return html
    },
    htmlToNodes(html) {
      return [{ type: 'node', name: 'div', attrs: { class: 'md-body' }, children: this._parseHtml(html) }]
    },
    _parseHtml(html) {
      const nodes = []
      const tagRegex = /<(\/?)(\w+)([^>]*)>/g
      const textRegex = /([^<]+)/
      let lastIndex = 0
      const stack = [[]]
      let match
      while ((match = tagRegex.exec(html)) !== null) {
        if (match.index > lastIndex) {
          const text = html.slice(lastIndex, match.index)
          if (text.trim()) stack[stack.length - 1].push({ type: 'text', text: text })
        }
        const isClose = match[1] === '/'
        const tagName = match[2]
        if (isClose) {
          if (stack.length > 1) {
            const children = stack.pop()
            stack[stack.length - 1].push({ type: 'node', name: tagName, attrs: {}, children: children })
          }
        } else {
          const attrs = {}
          const attrStr = match[3]
          const attrRegex = /(\w+)=["']([^"']*)["']/g
          let am
          while ((am = attrRegex.exec(attrStr)) !== null) {
            attrs[am[1]] = am[2]
          }
          if (tagName === 'br' || tagName === 'hr' || tagName === 'img') {
            stack[stack.length - 1].push({ type: 'node', name: tagName, attrs, children: [] })
          } else {
            stack.push([])
          }
        }
        lastIndex = tagRegex.lastIndex
      }
      if (lastIndex < html.length) {
        const text = html.slice(lastIndex)
        if (text.trim()) stack[stack.length - 1].push({ type: 'text', text })
      }
      return stack[0]
    },
  },
})
