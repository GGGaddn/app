<template>
  <div class="container">
    <div class="row">
      <div class="col m6">
        <div class="card p-20">
          <div class="card-title">Добавить новую задачу</div>
          <input v-model="text" type="text" placeholder="Суть задачи" />
          <input v-model="date" type="date" />
          <input v-model="tagName" type="text" placeholder="Введите тег" />
          <button @click="newTag" class="btn mb-10">Добавить тег</button>
          <div class="row">
            <tag-views
              @on-delete-tag="deleteTag"
              v-for="t in tags"
              :key="t.id"
              :tag="t"
              :taskId="taskId"
            />
          </div>
          <button @click="newTask" class="btn mb-10">Добавить</button>
          <div class="message-box red-text">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TagViews from "./TagViews.vue";
import new_tag_mixin from "./mixins/new_tag"
export default {
  components: {
    TagViews,
  },
  mixins:[new_tag_mixin],
  data() {
    return {
      text: "",
      date: "",
      tagName: "",
      message: ""
    };
  },
  methods: {
    newTask() {
      if (this.text.length > 0 && this.date.length > 0) {
        const task = {
          id: this.taskId,
          completed:false,
          text: this.text,
          date: this.date,
          tags: this.tags,
        };
        this.message = "";
        this.text = "";
        this.tags = [];
        this.date = ""
        this.$store.commit("newTask", task);
        this.taskId = this.$store.getters.getNewId;
      } else {
        this.message = "Нельзя оставлять поля пустым!";
      }
    },
  },
  created() {
    this.taskId = this.$store.getters.getNewId;
  },
};
</script>