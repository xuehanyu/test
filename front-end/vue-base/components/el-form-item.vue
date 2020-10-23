<template>
    <div>
        <label>{{label}}</label>
        <slot></slot>
        {{errMsg}}
    </div>
</template>

<script>
    import Schema from 'async-validator';
    export default {
        inject: ['elForm'],
        name: 'el-form-item',
        data() {
            return {
                errMsg: ''
            }
        },
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String,
                default: ''
            }
        },
        mounted() {
            this.$on('validate', ()=>{
                this.validate()
            })
        },
        methods: {
            validate() {
                const descriptor = {
                    [this.prop]: this.elForm.rules[this.prop]
                }
                const newValue = this.elForm.model[this.prop]
                const schema = new Schema(descriptor)
                return schema.validate({
                    [this.prop]: newValue
                }, (error) => {
                    if (error) {
                        this.errMsg = error[0].message
                    } else {
                        this.errMsg = ''
                    }
                })
            }
        },
    }
</script>