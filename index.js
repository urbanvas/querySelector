// takes in a string argument and returns an OBJ with the CSS attr parsed
// Note: Use of ES6 arrow functions to show knowledge
// normally I would just follow the standard set by the codebase, in this case ES5 functions
const parseTagsfromString = (subselector) => {
	// init object with keys that we want from our String
	const tagsHash = { tag: '', classes: [], id: '', attrs: [] };

	// iterate over str via REGEX and place the result into the correct key of the OBJ
	subselector.split(/(?=\.)|(?=#)|(?=\[)/).forEach((token) => {
		switch (token[0]) {
			case '#':
				tagsHash.id = token.slice(1);
				break;
			case '.':
				tagsHash.classes.push(token.slice(1));
				break;
			case '[':
				tagsHash.attrs.push(token.slice(1, -1).split('='));
				break;
			default:
				tagsHash.tag = token;
				break;
		}
	});
	return tagsHash;
};

// ASSUMPTION: Space Complexity Priority

var $ = function(selector) {
	// variable below gets a flattened NODElist of the BODY content of the HTML document
	// SPECIFIC TO CHROME
	const HTMLCollection = document.createNodeIterator(document.body).root.children;

	// with an above function defined earlier in this file
	// we take the selector passed into this function as a string and create a obj
	// with the keys of TAGS, CLASSES, IDS, ATTRS
	// the value of each key is an arr containing string values parsed from the input str
	const selectorObj = parseTagsfromString(selector);
	// init the arr that will be the RETURN value of this function.
	// we will push all matching NODES from the HTMLCollection here as we find them.
	const nodeCollection = [];

	///////////////////////////////////////////
	// ID's are unique so we check for their existance first as to
	// save resources and return early.
	if (selectorObj.id) {
		// first check is to see if only an ID has been passed as an argument
		// everything else would have a .tag value
		// so if this check fails, that means there must be more checks that need to be taken care of
		if (selectorObj.tag === '') {
			for (const node of HTMLCollection) {
				if (node.id === selectorObj.id) {
					nodeCollection.push(node);
					// we break out of the loop as there can only be one node with the ID in question.
					break;
				}
			}
			return nodeCollection;
		} else {
			for (const node of HTMLCollection) {
				// since our conditonal has made it here we must also check if the tagname matches what
				// has been passed in the argument
				if (node.id === selectorObj.id && node.tagName.toLowerCase() === selectorObj.tag) {
					nodeCollection.push(node);
					// we break out of the loop as there can only be one node with the ID in question.
					break;
				}
			}
			return nodeCollection;
		}
	}
	///////////////////////////////////////////

	// handles if only a tagname exists
	if (selectorObj.classes.length === 0 && selectorObj.tag) {
		for (const node of HTMLCollection) {
			if (node.tagName.toLowerCase() === selectorObj.tag) {
				nodeCollection.push(node);
			}
		}
		return nodeCollection;
	}

	///////////////////////////////////////////

	// IDS are taken care of, now to check for classes
	// handles if only classes have been passed
	// use of nested forloops on the assumption of Space Complexitiy
	// if Time Complexity is needed, I would use a hash the nodeList and make checks for classes
	if (selectorObj.classes.length && selectorObj.tag === '') {
		// iterate over NodeList
		for (const node of HTMLCollection) {
			// if it has classes
			if (node.classList.length) {
				// iterate over the classes and check to see if they exist as passed in the arg string
				node.classList.forEach((el) => {
					if (selectorObj.classes.includes(el)) {
						nodeCollection.push(node);
					}
				});
			}
		}
		// early return so the next code block only runs if
		// - no ID
		// - has a tagName
		return nodeCollection;
	} else {
		// handles all other checks
		// - no ID
		// - has a tagName
		for (const node of HTMLCollection) {
			node.classList.forEach((el) => {
				// since this code block includes tagLines we must check
				// if it matches the str input
				if (selectorObj.classes.includes(el) && node.tagName.toLowerCase() === selectorObj.tag) {
					nodeCollection.push(node);
				}
			});
		}
		return nodeCollection;
	}
};
