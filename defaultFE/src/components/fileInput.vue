<template>
    <div class="container">
        <div class="input-wrapper">
            <label for="fileInput">Choose File</label>
            <input type="file" name="fileInput" id="fileInput" ref="fileInput" v-on:change="handleFileUpload()">
            <!-- ref is used to register a reference to an element or a child component. The reference will be registered under the parent component’s $refs object -->
        </div>
        <button class="btn" v-on:click="submitFile()">Upload</button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                url: process.env.VUE_APP_API_URL,
                // store file data
                file: ''
            }
        },

        methods: {
            handleFileUpload() {
                // get first file from input ref once changed
                this.file = this.$refs.fileInput.files[0];
                console.log(this.file);

            },
            submitFile() {
                let formData = new FormData();

                // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
                formData.append('file', this.file);

                const sendFile = async () =>{
                    // try{
                    //     const res = await axios.post(this.url + '/single-file',
                    //         formData,
                    //         {
                    //             headers: {
                    //                 'Content-Type': 'multipart/form-data'
                    //             }
                    //         }
                    //     );

                    //     console.log(res.data);

                    // } catch(err){
                    //     console.error(err, res.data)
                    // }

                    axios.post(this.url + '/single-file',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    ).then(res => {
                        console.log(res.data)
                    }, err => {
                        console.error(err)
                    })
                };

                sendFile();
            }
        },

        mounted(){
            console.log(process.env);
        }
    }
</script>

<style scoped>
    .container {
        max-width: 100%;
        padding: 3em;
    }

    .input-wrapper{
        background: #efefef;
        border-radius: 1em;
        padding: 2em 1em;
        margin-bottom: 2em;
    }

    input[type="file"]{
        outline: none;
    }

    label[for="fileInput"]{
        display: block;
        margin-bottom: 1em;
    }
</style>