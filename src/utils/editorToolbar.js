import { useQuasar } from 'quasar'

export default function editorToobar() {
  const $q = useQuasar()
  return [
    [
      {
        label: '',
        icon: $q.iconSet.editor.fontSize,
        fixedLabel: true,
        fixedIcon: true,
        list: 'no-icons',
        options: [
          'size-1',
          'size-2',
          'size-3',
          'size-4',
          'size-5',
          'size-6',
          'size-7',
        ],
      },
    ],
    ['bold', 'italic', 'underline'], // sahudsauhdshua
    ['hr', 'unordered', 'ordered'],
    ['link'],
    ['removeFormat'],
  ]
}

// ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
// ['token', 'hr', 'link', 'custom_btn'],
// ['print', 'fullscreen'],
// [
//   {
//     label: $q.lang.editor.formatting,
//     icon: $q.iconSet.editor.formatting,
//     list: 'no-icons',
//     options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
//   },
//   {
//     label: $q.lang.editor.fontSize,
//     icon: $q.iconSet.editor.fontSize,
//     fixedLabel: true,
//     fixedIcon: true,
//     list: 'no-icons',
//     options: [
//       'size-1',
//       'size-2',
//       'size-3',
//       'size-4',
//       'size-5',
//       'size-6',
//       'size-7',
//     ],
//   },
//   {
//     label: $q.lang.editor.defaultFont,
//     icon: $q.iconSet.editor.font,
//     fixedIcon: true,
//     list: 'no-icons',
//     options: [
//       'default_font',
//       'arial',
//       'arial_black',
//       'comic_sans',
//       'courier_new',
//       'impact',
//       'lucida_grande',
//       'times_new_roman',
//       'verdana',
//     ],
//   },
//   'removeFormat',
// ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
// ],

// ['undo', 'redo'],
// ['viewsource'],
