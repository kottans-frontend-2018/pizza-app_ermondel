/**
 * None Component
 * version 0.7
 */
import Component from '../../component';

class None extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('main');
		this.container.id = 'main';
    }

    render() {
        return `
        <div id="info" class="info-404">
            <div id="info_inner">
                <h1>404</h1>
                <p>Not found.</p>
            </div>
        </div>`;
    }
}

export default None;
