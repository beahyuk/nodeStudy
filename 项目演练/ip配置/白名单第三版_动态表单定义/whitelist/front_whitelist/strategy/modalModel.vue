<template>
  <a-modal
    :visible="visible"
    title="设置"
    okText="确定"
    @cancel="handleCancel"
    @ok="handleSubmit"
    @submit="()=>{$emit('submit')}"
  >
    <a-form-model :form="form" :model="dynamicValidateForm" >
      <a-form-item label="Title" v-bind="formItemLayout">
        <a-input v-decorator="['title']" />
      </a-form-item>
      <a-form-item label="Description" v-bind="formItemLayout">
        <a-input type="textarea" v-decorator="['description']" />
      </a-form-item>

      <a-form-model-item
        v-for="(item,index) in dynamicValidateForm.white2list"
        :key="index"
        v-bind="index === 0 ?formItemLayout: formItemLayoutWithOutLabel"
        :label="index === 0 ? '白名单':''"
        :prop ="'white2list.' + index +'.value'"
        :rules="[
            { required: true, message: '白名单不能为空',trigger: 'blur'},
           {validator:ipValidate,trigger:['blur','change']}
          ]"
      >

        <a-input
          v-model="item.value"
          style="width:60%;margin-right:8px"
          allow-clear>
        </a-input>
        <a-icon 
          v-if="dynamicValidateForm.white2list.length>1"
          class="dynamic-delete-button"
          type="minus-circle-o"
          :disabled="dynamicValidateForm.white2list.length ===1"
          @click ="remove(item)"
        />
      </a-form-model-item>
      <a-form-model-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed"  style="width:60%" @click="add">
          <a-icon type="plus"></a-icon>添加IP区间
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
let id = 0;
export default {
  name: "modalTemp",
  props: ["visible"],
  data() {
    return {
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
      dynamicValidateForm: {
        white2list: [],
      },
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
  },
  methods: {
    handleCancel() {
      this.$emit("handleCancel");
    },

    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const arr = this.dynamicValidateForm.white2list.map((item) => item.value)
          console.log(arr);
          // this.submit();
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
    remove(item){
      let index = this.dynamicValidateForm.white2list.indexOf(item);
      if(index !== -1){
        this.dynamicValidateForm.white2list.splice(index,1);
      }
    },
    add(){
      this.dynamicValidateForm.white2list.push({
        value:'',
        key:Date.now(),
      });
    },
    testIP(str){
      const regex = /^(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}\-?)\,?)*$/g;
      return regex.test(str)? true:false
    },
    ipValidate(rule,value,callback){
      if(typeof(value) === "undefined" || value === ""){
        callback()
      }else{
        if(!this.testIP(value)){
          callback(new Error("请输入白名单格式"))
        }else{
          callback()
        }
      }
    }

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