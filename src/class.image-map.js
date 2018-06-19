class ImageMap {

	/**
	 * Contructor
	 * @param {Area[]} areas 
	 * @param {string} name 
	* @param {boolean} hasDefaultArea
	 */
	constructor(areas = [], name, hasDefaultArea = false) {
		this.name = name;
		this.width = 0;
		this.height = 0;
		this.scale = 1;
		this.areas = areas;
		this.dArea = new AreaDefault();
		this.hasDefaultArea = hasDefaultArea;
		this.lastId = 0;
	}

	setName(name) {
		this.name = name.replace(/\s+/g, "");
	}

	setSize(width, height) {
		this.width = width;
		this.height = height;
	}

	setScale(scale) {
		this.scale = scale;
	}

	setDefaultArea(bool) {
		this.hasDefaultArea = bool;
	}

	getAreas(all = true) {
		var areas = this.areas.slice();
		if (all && this.hasDefaultArea) areas.unshift(this.dArea);
		return areas;
	}

	/**
	 * Adds an Area at the end of the areas array, and returns the last inserted Area's id
	 * @param {Area} area an area
	 */
	addArea(area, setId = true) {
		if (setId)
			area.id = this.getNewId();
		this.areas.push(area);
		return area.id;
	}

	rmvArea(id) {
		var index = this.areaIndex(id);
		this.areas.splice(index, 1);
		return index;
	}

	popArea() {
		return this.areas.pop();
	}

	insertArea(area, index) {
		this.areas.splice(index, 0, area);
	}

	areaIndex(id) {
		return this.areas.findIndex(a => {
			return a.id == id;
		});
	}

	getNewId() {
		this.lastId++;
		return this.lastId;
	}

	toHtml() {
		var areas = [];
		this.getAreas().forEach(a => {
			if (a.isValidShape())
				areas.push('\t' + a.toHtml(this.scale));
		});
		return '<map name="' + this.name + '" id="' + this.name + '">\n' + areas.reverse().join('\n') + '\n</map>';
	}

	toSvg() {
		var areas = [];
		this.getAreas(false).forEach(a => {
			if (a.isValidShape())
				areas.push('\t' + a.toSvg(this.scale));
		});
		var str = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + this.width + '" height="' + this.height + '">\n';
		str += areas.reverse().join('\n');
		str += '\n</svg>';
		return str;
	}

	/** Removes avery areas from the areas array */
	clearAreas() {
		this.areas = [];
	}

	setAreas(areas) {
		this.areas = areas;
	}

}