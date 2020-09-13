<template>
  <div>
    {{result}}
  </div>
</template>

<script>

import{GetC} from './testJS';
  export default {
    data(){
      return{
        result:null,
      }
    },
    mounted(){
      let c =5;
      let getc = new GetC(c);
      this.result = getc.add(1,2);
    }
  }

</script>

<style lang="scss" scoped>

</style>