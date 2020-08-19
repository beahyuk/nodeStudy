<template>
  <a-card class="card">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        v-for="(k, index) in form.getFieldValue('keys')"
        :key="k"
        v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
        :label="index === 0 ? 'whiteIP' : ''"
        :required="false">
        <a-input
          v-decorator="[
           `names[${k}]`,
            {
              validateTrigger: ['change', 'blur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Please input whiteIP or delete this field.',
                },
              ],
            },
          ]"
          placeholder="请输入IP"
          style="width: 60%; margin-right: 8px"
          allow-clear>
        </a-input>
        <a-icon
          v-if="form.getFieldValue('keys').length > 1"
          class="dynamic-delete-button"
          type="minus-circle-o"
          :disabled="form.getFieldValue('keys').length === 1"
          @click="() => remove(k)"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" style="width: 60%" @click="add">
          <a-icon type="plus"></a-icon>添加
        </a-button>
      </a-form-item>

      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import Vue from "vue";

let id = 0;
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },

  methods: {
    remove(k) {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      // console.log(`keys:${keys}`)
      // We need at least one passenger
      if (keys.length === 1) {
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter((key) => key !== k),
      });
    },

    add() {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      console.log(keys);
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const { keys, names } = values;
          const mergedValues = keys.map((key) => names[key]);
          // this.axios
          //   .post("http://172.25.73.71:3000/getLatestVerInfo", {
          //     whiteList: mergedValues,
          //   })
          //   .then((res) => {
          //     console.log(res);
          //   });
          console.log("Received values of form: ", values);
          console.log("Merged values:", mergedValues);
        }
      });
    },
  },
};
</script>

<style >
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.card {
  width: 500px;
  /* height: 100%; */
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255,0.1) !important;
}
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #ff4d4f;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>