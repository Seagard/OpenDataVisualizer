class Dataset {
    constructor($resource) {
        this.$resource = $resource;
        this.getCategories = this.getCategories.bind(this);
        this.getDatasetsByCategory = this.getDatasetsByCategory.bind(this);
    }

    getCategories() {
        return this.$resource('/portaldata/categories').query().$promise;
    }

    getDatasetsByCategory(name) {
        console.log(name);
        return this.$resource('/portaldata/categories/:name', {name: name}).query().$promise;
    }
}

export default Dataset;