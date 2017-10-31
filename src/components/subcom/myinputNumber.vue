<template>
    <div class="mycom">
        <ul>
            <li @click="substrict">-</li>
            <li>{{count}}</li>
            <li @click="add">+</li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                count: 1
            }
        },
        props: ['options'],
        created() {
            this.count = this.options.count;
        },
        methods: {
            // 减一
            substrict() {
                if (this.count > 0) {
                    this.count--;
                    this.send();
                }

            },
            // 加一
            add() {
                this.count++;
                this.send();
            },
            // 触发子组件传值给父组件
            send() {
                this.$emit('update', {
                    gid: this.options.gid,
                    count: this.count
                });
            }
        }
    }
</script>
<style scoped>
    .mycom ul {
        width: 120px;
    }
    
    .mycom li {
        cursor: pointer;
        list-style: none;
        display: inline-block;
        width: 30px;
        padding: 2px;
        text-align: center;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
</style>