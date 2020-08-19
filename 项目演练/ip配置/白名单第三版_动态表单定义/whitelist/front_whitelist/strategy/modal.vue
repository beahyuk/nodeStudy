<template>
  <a-modal
    :visible="visible"
    title="设置"
    okText="确定"
    @cancel="handleCancel"
    @ok="handleSubmit"
    @submit="()=>{$emit('submit')}"
  >
    <a-form  :form="form">
      <a-form-item label="Title" v-bind="formItemLayout">
        <a-input v-decorator="['title']" />
      </a-form-item>
      <a-form-item label="Description" v-bind="formItemLayout">
        <a-input type="textarea" v-decorator="['description']" />
      </a-form-item>
     

      <a-form-item
        v-for="(k,index) in form.getFieldValue('keys')"
        :key="k"
        v-bind="index === 0 ?formItemLayout: formItemLayoutWithOutLabel"
       :label="index === 0 ? '白名单':''"
       :required ="false">
        <a-input
          v-decorator="[`whiteIPs[${k}]`,ValidateRules.whiteIP]"
          style="width:60%;margin-right:8px"
          allow-clear>
        </a-input>
        <a-icon 
          v-if="form.getFieldValue('keys').length>0"
          class="dynamic-delete-button"
          type="minus-circle-o"
          :disabled="form.getFieldValue('keys').length ===0"
          @click ="remove(k)"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed"  style="width:60%" @click="add">
          <a-icon type="plus"></a-icon>添加IP区间
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
let id = 0;
export default {
  name: "modalTemp",
  props: ["visible"],
  data() {
    return {
      // form: this.$form.createForm(this),
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
      whiteIpArr:"",
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
  beforeCreate(){
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator('keys',{initialValue:[],preserve:true});
  },
  methods: {
    handleCancel() {
      this.$emit("handleCancel");
    },

    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const {keys,whiteIPs} = values;
          const mergedValues = keys.map(key => whiteIPs[key])
          this.whiteIpArr = mergedValues;
          if (!this.whiteIpArr.length)    this.whiteIpArr.push("0.0.0.0-255.255.255.255") ;
          console.log(`whiteIps:${this.whiteIpArr}`, typeof this.whiteIpArr);

          this.submit();
        }
      });
    },
     submit() {
        this.axios
          .post("http://127.0.0.1:3001/getLatestVerInfo", {
            whiteList: this.whiteIpArr,
          })
          .then(res=>{
            console.log(res);
          })
        this.handleCancel();
        this.$message.success("操作成功");
    },
    remove(k){
      const {form} =this;

      let keys = form.getFieldValue('keys');
      if(keys.length === 0){
        return;
      }
      form.setFieldsValue({
        keys: keys.filter((key) => key !== k),
      });
    },
    add(){
      const {form} =this;
      let keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(id++);
      this.form.setFieldsValue({
        keys:nextKeys,
      });
    },

  },
};
</script>

<style >
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