// import { define, html } from 'hybrids'
// import Qty from 'js-quantities'
// import '@auzmartist/cam-el/button'
// import '@auzmartist/cam-el/grid'
// import '@auzmartist/cam-el/icon'

// export const RecipeIngredient = define<any>({
//   tag: 'recipe-ingredient',
//   iid: '',
//   name: '',
//   scalar: 0,
//   unit: '',
//   inline: false,
//   qty: ({ scalar, unit }) => Qty(`${scalar} ${unit}`),
//   status: () => 'info',
//   // prettier-ignore
//   render: (host) => html`
//     ${host.inline ? html`
//       <cam-button type="ghost" onclick="${(host) => host.toggle = !host.toggle}" flow="column" gap="0.33rem" justify="space-between" items="center" inline>
//         <span>${host.qty} ${host.name}</span>
//         <div class="status">
//           <cam-icon>${host.status}</cam-icon>
//         </div>
//       </cam-button>

//       ${host.toggle && html`Hello`}
//     ` : html`
//       <cam-grid>
//         <span><b>${host.qty}</b> ${host.name}</span>
//         <small>${host.iid}</small>
//       </cam-grid>
//     `}
//   `.css`
//     :host {
//       position: relative;
//     }
//     cam-button[type='ghost'] {
//       --padding: 0;
//       --border-radius: 0;
//       --padding: 0 0 0 0.5rem;
//       display: inline-grid;
//       background: rgba(255, 255, 255, 0.1);
//       border: none;
//       cursor: pointer;
//     }
//     cam-button::part(button) {
//       color: unset;
//     }
//     .status {
//       display: flex;
//       width: 1.4rem;
//       height: 1.4rem;
//       justify-content: center;
//       align-items: center;
//       background: #777799;
//     }
//     small {
//       color: #888;
//       line-height: 0.75em;
//       font-size: 0.75em;
//       margin-bottom: 4px;
//     }
//   `,
// })
