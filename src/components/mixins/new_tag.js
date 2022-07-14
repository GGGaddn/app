export default {
    data(){
        return{
            tags: [],
            tagName: "",
            taskId: null
        }
    },
    methods: {
        newTag() {
            if (this.tagName.length > 0) {
                this.tags.push({
                    id: this.getNewTagId(),
                    name: this.tagName,
                });
                this.tagName = ""
            }
        },
        getNewTagId() {
            if (this.tags.length == 0) {
                return 1;
            } else if (this.tags.length == 1) {
                return this.tags[0].id + 1;
            } else {
                let max = this.tags[0].id;
                this.tags.forEach((t) => {
                    if (t.id > max) {
                        max = t.id;
                    }
                });
                return max + 1;
            }
        },
        deleteTag(id) {
            this.tags = this.tags.filter((t) => t.id != id);
        },
    }
}