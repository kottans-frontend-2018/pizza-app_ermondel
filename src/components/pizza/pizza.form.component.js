/**
 * Pizza Form Component
 * version 0.75
 * props: size, ingredients, tags, price, errors
 * onChangeIngredient, onChangeTag, onChangeSize, onSubmit, onErrorValidate
 */
import Component            from '../../component';
import { validateElements } from '../../utils/util';
import { pizzaFormRules }   from './pizza.form.rules';

class PizzaForm extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('form');
        this.container.id = 'create';
        this.container.addEventListener('change', this.handlerChange.bind(this));
        this.container.addEventListener('submit', this.handlerSubmit.bind(this));
        this.container.addEventListener('focusin', this.handlerFocus.bind(this));
    }

    handlerChange(e) {
        if (e.target.type === 'checkbox') 
		{
			if (e.target.name === 'ingredient') this.props.onChangeIngredient(e.target.value, e.target.checked);
            if (e.target.name === 'tag') this.props.onChangeTag(e.target.value, e.target.checked);
        }
        if (e.target.type === 'radio')
        {
            if (e.target.name === 'size') this.props.onChangeSize(e.target.value);
        }
    }

    handlerSubmit(e) {
        e.preventDefault();

        const name = e.target.elements.name.value.trim();
        const description = e.target.elements.description.value.trim();

        const res = validateElements(e.target.elements, pizzaFormRules);

        if (res.result) {
            this.props.onSubmit(name, description);
        } else {
            this.props.onErrorValidate(res.errors);
        }
    }

    handlerFocus(e) {
		document.getElementById('form-errors').innerHTML = '';
    }

    renderIngredients() {
        const { ingredients } = this.props;

        // number of ingredients selected
        let ingredientsCheckedCount = 0;
        for (let ingredient of ingredients) if (ingredient.checked) ingredientsCheckedCount++;

        return ingredients.map(ingr => {
            // html attributes for checkbox
            const attr = {
                checked: ingr.checked ? ' checked="checked"' : '',
                disabled: !ingr.checked && ingredientsCheckedCount >= 6 ? ' disabled' : '',
            };

            return `
            <label title="${ingr.description}">
                <input type="checkbox" name="ingredient" value="${ingr.id}"${attr.checked}${attr.disabled}>
                <span class="ingredient"><img src="${ingr.image.src}" alt="${ingr.description}"><span>${ingr.name}</span></span>
            </label>`;
        }).join('');
    }

    renderTags() {
        const { tags } = this.props;

        return tags.map(tag => `
        <label title="${tag.description}">
            <input type="checkbox" name="tag" value="${tag.id}" ${(tag.checked ? 'checked="checked"' : '')}>
            <span class="tag"><span>${tag.name}</span></span>
        </label>`).join('');
    }

    renderErrors() {
        const { errors } = this.props;

        return errors.length ? '<ul>' + errors.map(error => `<li>${error}</li>`).join('') + '</ul>' : '';
    }

    render() {
        const { size, price, errors } = this.props;

        return `
        <div id="size-box">
            <span class="legend">Pizza size</span> 
            <label><input type="radio" name="size" value="30"${(size == 30 ? 'checked="checked"' : '')}> <span>30°</span></label>
            <label><input type="radio" name="size" value="45"${(size == 45 ? 'checked="checked"' : '')}> <span>45°</span></label>
            <label><input type="radio" name="size" value="60"${(size == 60 ? 'checked="checked"' : '')}> <span>60°</span></label>
        </div>
        <div id="ingredient-box">${this.renderIngredients()}</div>
        <div id="tag-box">${this.renderTags()}</div>
        <div id="text-box">
            <label>
                <span>Pizza name *</span>
                <input type="text" id="name" name="name">
            </label>
            <label>
                <span>Description</span>
                <input type="text" id="description" name="description">
            </label>
        </div>
        <div id="price-box">
            Total price: <strong>${price}</strong>
        </div>
        <div id="submit-box">
            <button class="box-radius-5 box-shadow-2">Submit</button>
        </div>
        <div id="form-errors" class="box-radius-5">${this.renderErrors()}</div>`;
    }
}

export default PizzaForm;