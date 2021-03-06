/**
 * None (404) Component
 * version 0.88
 */
import Component  from '../../component';
import { ROUTER } from '../../services/router.service';

class None extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('main');
		this.container.id = 'main';
    }

    render() {
        const content =  ROUTER.oldURL ? `<p>This page <a href="${ROUTER.oldURL}">${ROUTER.oldURL}</a> was not found.</p>` : '';

        return `
        <div id="info" class="info-404">
            <div id="info_inner" class="box-radius-5 box-shadow-2">
                <h1>404</h1>
                ${content}
            </div>
        </div>`;
    }
}

export default None;