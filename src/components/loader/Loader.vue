<template>
    <div class="loader-shadow">
        <div class="loader">
            <i class="fas fa-cog animation"></i>
        </div>
    </div>
</template>
<style  scoped>
    .loader-shadow{
        position:fixed;
        top:0;
        left:0;
        background-color: rgba(100, 100, 100, 0.5);
        height:100%;width:100%;
    }
    .loader{
        font-size: 60px;
        color: #fff;
        position: fixed;
        top: calc(49% - 30px);
        left: calc(50% - 30px);
    }
</style>