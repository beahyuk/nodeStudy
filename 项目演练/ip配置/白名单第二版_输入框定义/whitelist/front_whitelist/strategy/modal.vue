<template>
  <a-modal
    :visible="visible"
    title="设置"
    okText="确定"
    @cancel="handleCancel"
    @ok="handleSubmit"
    @submit="()=>{$emit('submit')}"
  >
    <a-form layout="vertical" :form="form">
      <a-form-item label="Title">
        <a-input v-decorator="['title']" />
      </a-form-item>
      <a-form-item label="Description">
        <a-input type="textarea" v-decorator="['description']" />
      </a-form-item>
      <a-form-item label="白名单">
        <a-input v-decorator="['whiteIP', ValidateRules.whiteIP]"></a-input>
        <span>IP区间段或单个IP，多个IP以英文逗号 , 隔开，例如：172.25.73.71-172.25.73.255,127.0.0.1</span>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: "modalTemp",
  props: ["visible"],
  data() {
    return {
      form: this.$form.createForm(this),
      ValidateRules: {
        whiteIP: {
          rules: [
            { required: true, message: "请输入白名单" },
            {
              pattern: /^(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}\-?)\,?)*$/g,
              message: "请输入正确格式的ip",
            },
          ],
        },
      },
      whiteIps:""
    };
  },
  methods: {
    handleCancel() {
      this.$emit("handleCancel");
    },

    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.whiteIps = values.whiteIP;
          console.log(`whiteIps:${this.whiteIps}`, typeof this.whiteIps);
          this.submit();
          // 在index首页显示输入的白名单
          // this.$emit('submit')
        }
      });
    },
     submit() {
        // debugger;
        this.axios
          .post("http://172.25.73.71:3000/getLatestVerInfo", {
            whiteList: this.whiteIps,
          })
          .then(res=>{
            console.log(res);
          })
        this.handleCancel();
        this.$message.success("操作成功");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>