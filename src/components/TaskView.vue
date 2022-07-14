<template>
  <li class="collection-item">
    <div class="row">
      <div class="col m-11">
        <div v-if="!isEdit" class="task">
          <label class="mb-10">
            <input
              @change="completedTask(task.id)"
              :checked="task.completed"
              class="filled-in"
              type="checkbox"
            />
            <span
              v-if="!isEdit"
              v-bind:class="{ completed: task.completed }"
              class="black-text mb-10"
              >{{ task.text }}</span
            >
          </label>
          <span class="date mb-10"> Срок: {{ task.date }} </span>
          <div class="row">
            <tag-views
              @on-delete-tag="deleteTag"
              v-for="t in task.tags"
              :key="t.id"
              :tag="t"
            />
          </div>
          <div class="button">
            <button class="btn mb-10" @click="isEdit = !isEdit">Изменить</button>
          </div>
        </div>
        <div v-else class="edit">
          <input
            type="text"
            :value="task.text"
            @input="(e) => setTask(task.id, e.target.value, task.date)"
          />
          <input
            @change="(e) => setTask(task.id, task.text, e.target.value)"
            type="date"
            :value="task.date"
          />
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
          <div class="button mb-10">
            <button class="btn" @click="save">Сохранить</button>
          </div>
        </div>
        <button
          @click="deleteTask(task.id)"
          class="btn waves-effect waves-light"
        >
          Удалить
        </button>
      </div>
    </div>
  </li>
</template>

<script>
import TagViews from "./TagViews.vue";
import new_tag_mixin from './mixins/new_tag'
export default {
  components: {
    TagViews,
  },
  mixins:[new_tag_mixin],
  data() {
    return {
      isEdit: false,
    };
  },
  props: ["task"],
  methods: {
    deleteTask(id) {
      this.$store.commit("deleteTask", id);
    },
    completedTask(id) {
      this.$store.commit("completedTask", id);
    },
    setTask(id, text, date) {
      this.$store.commit("setTask", { id, text, date});
    },
    pushTags(){
      console.log(this.tags)
      this.$store.commit("pushTags",
      {
        taskId:this.task.id, 
        tags:this.tags
      }
      )
    },
    deleteTag(tagId) {
      this.$store.commit("deleteTag", {
        taskId: this.task.id,
        tagId,
      });
      this.tags =[...this.task.tags]
    },
    save(){
      this.isEdit = !this.isEdit;
      this.pushTags()
    }
  },
  created(){
    this.taskId = this.task.id
    this.tags = [...this.task.tags]
  }
};
</script>
<style lang="scss" scoped>
span {
  display: block;
}

label {
  display: block;
}
.completed {
  text-decoration: line-through;
}
</style>