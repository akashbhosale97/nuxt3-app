<template>
  <nav>
    <h1>Logo</h1>
    <ul>
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink to="/about">About</NuxtLink></li>
      <li><NuxtLink to="contact">Contact</NuxtLink></li>
    </ul>
  </nav>
</template>

<script>
  export default {};
</script>

<style scoped>
  nav {
    background: #eee;
    min-height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 100px;
  }

  nav ul li {
    display: inline-block;
    margin: 0 15px;
    font-size: 18px;
    cursor: pointer;
    transition: 0.3s ease all;
  }
  nav ul li a:hover {
    color: red;
  }
  nav h1 {
    cursor: pointer;
  }
</style>
