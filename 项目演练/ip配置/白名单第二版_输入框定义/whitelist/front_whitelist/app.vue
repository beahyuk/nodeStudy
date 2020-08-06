<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <!-- 建议使用antd自带的v-decorator来定义表单项,建议封装校验方法，页面结构更清晰 -->
      <a-input v-decorator="['note', ValidateRules.note]" />
      <!-- 没有校验方法，也可以直接这么写 -->
      <!-- <a-input v-decorator="['note']"/> -->
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: "TestForm",
  data() {
    return {
      // 这里是用createForm创建表单，传入this即可
      form: this.$form.createForm(this),
      // 后面这个参数是options配置项(可选参数)，为啥要设置他，见后面说明
      //form: this.$form.createForm(this, { name: 'loginForm' }),
      ValidateRules: {
        note: {
          rules: [{ required: true, message: "Please input your whiteIp!" }],
        },
      },
    };
  },
  methods: {
    handleSubmit(e) {
      // const aa = document.getElementById('note')
      // console.log(aa.value)
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.axios
            .post("http://172.25.73.71:3000/getLatestVerInfo", {
              whiteList: values.note,
            })
            .then((res) => {
              console.log(res);
            });
          console.log(`输入框为: ${values.note}`, typeof values.note );
        }
      });
      // console.log(this.form.getFieldsValue());
    },
  },
};
</script>