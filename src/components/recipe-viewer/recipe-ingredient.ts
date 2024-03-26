import { define, html } from 'hybrids'

export const RecipeIngredient = define<any>({
  tag: 'recipe-ingredient',
  value: 0,
  unit: 'cu',
  measure: ({ value, unit }) => ({ value, unit }),
  name: '',
  fractional: false,
  inline: false,
  render: ({ measure, name }) => html`
    <label class="quantity"><b>${measure.value} ${measure.unit}</b></label>
    <span class="name"><em>${name}</em></span>
  `.css`
    :host {
      --br: 0.25rem; /* border radius */
      --ph: 0.3rem; /* horiz padding */
    }

    /* (context) recipe-step */
    :host-context(recipe-step) {
      display: inline-grid;
      border-radius: var(--br);
      border: 1px solid var(--recipe-ingredient_border-color, transparent);
      grid-template-columns: auto auto;
      color: --inherit;
    }

    :host-context(recipe-step) > * {
      padding: 0.1rem var(--ph);
      border-right: 1px solid var(--recipe-ingredient_border-color, transparent);
    }

    :host-context(recipe-step) > *:last-child {
      border-right: none;
    }

    :host-context(recipe-step) .quantity {
      border-top-left-radius: var(--br);
      border-bottom-left-radius: var(--br);

      background: var(--recipe-ingredient_quantity-background-rgba, rgba(203, 230, 230, 0.15));
      color: var(--recipe-ingredient_quantity-color, var(--recipe-ingredient_color, inherit));
    }

    :host-context(recipe-step) .name {
      border-top-right-radius: var(--br);
      border-bottom-right-radius: var(--br);

      background: var(--recipe-ingredient_name-background, rgba(203, 230, 230, 0.23));
      color: var(--recipe-ingredient_name-color, var(--recipe-ingredient_color, inherit));
    }
  `,
})
