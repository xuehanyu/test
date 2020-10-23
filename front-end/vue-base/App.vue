<template>
  <div>
      <!-- 主要由三个组件组成 el-form 、 el-form-item、 el-input -->
      <!-- el-form model、rules、 validate -->
      <!-- el-form-item  显示label， prop校验 -->
      <!-- el-input 实现双向数据绑定 -->
    {{ruleForm}}
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
            <!-- <el-input :value="ruleForm.password" @input="v=>ruleForm.password=v"></el-input> -->
        </el-form-item>
         <el-form-item>
            <button @click="submitForm">提交</button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import elForm from './components/el-form.vue'
import elFormItem from './components/el-form-item.vue'
import elInput from './components/el-input.vue'
  export default {
    components:{
      'el-form': elForm,
      'el-form-item': elFormItem,
      'el-input': elInput
    },
    data() {
      return {
        ruleForm: {
            username:'',
            password:''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
