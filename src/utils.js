/**
 * Validate form input elements
 * @elements e.g. event.target.elements
 * @rules set of rules for checking
 * return object
 *	result boolean
 *	errors array
 */
export const validateElements = (elements, rules) => {
	let res = {
		result: true,
		errors: [],
	};
	
	for (let prop in rules) {
		if (elements[prop]) 
		{
			let value = elements[prop].value.trim();
			let claim = rules[prop];
			
			if (claim.required && claim.required.rule === true && value.length < 1) {
				res.result = false;
				res.errors.push(claim.required.message);
				continue;
			}
			if (claim.min && value.length > 0 && value.length < claim.min.rule) {
				res.result = false;
				res.errors.push(claim.min.message);
				continue;
			}
			if (claim.max && value.length > 0 && value.length > claim.max.rule) {
				res.result = false;
				res.errors.push(claim.max.message);
				continue;
			}
			if (claim.pattern && value.length > 0 && value.search(claim.pattern.rule) < 0) {
				res.result = false;
				res.errors.push(claim.pattern.message);
				continue;
			}
			if (claim.equal && value.length > 0 && elements[claim.equal.rule] && elements[claim.equal.rule].value !== value) {
				res.result = false;
				res.errors.push(claim.equal.message);
				continue;
			}
		}
	}

	return res;
}

/**
 * URL path from string to array with the del of empty values
 * return array
 */
export const splitPath = (path) => {
	return path.split('/').filter(str => str.trim().length > 0);
};

/**
 * Compare two arrays of paths
 * return object
 *	result boolean
 *	params object(set)
 */
export const equalPaths = (a, b) => {
	// object with result for return
	let res = {
		result: false,
		params: {},
	};

	// check empty
	if (!a.length && !b.length) {
		res.result = true;
		return res;
	} else if (!a.length && b.length) {
		res.result = false;
		return res;
	}

	// check length
	if (a.length !== b.length) {
		res.result = false;
		return res;
	}

	// basic comparison
	for (let key in a) {
		//
		if (b[key] === undefined) {
			res.result = false;
			res.params = {};
			break;
		}
		//
		if (a[key] === ':id') {
			const id = parseInt(b[key]*1);
			if (id) {
				res.result = true;
				res.params.id = id;
			} else {
				res.result = false;
				res.params = {};
				break;
			}
		} else {
			if (a[key] === b[key]) {
				res.result = true;
			} else {
				res.result = false;
				res.params = {};
				break;
			}
		}
	}

	return res;
};
