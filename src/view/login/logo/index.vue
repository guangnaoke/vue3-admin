<template>
  <div class="logo">
    <div class="container">
      <div class="wrapper">
        <div class="triangle backLayer"></div>
      </div>
      <div class="wrapper">
        <div class="triangle middleLayer">
          <svg-icon name="golang" font-size="150px" />
        </div>
      </div>
      <div class="wrapper">
        <div class="triangle frontLayer"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  // --background-color: #343a40;
  --purple: #79808a;
  --blue: #563d7c;
  --green: #41b883;
  --white: #fff;
  --triangle: polygon(0% 0%, 100% 0%, 50% calc(8.66 * 30px));
  --hexagon: polygon(
    0% 0%,
    20% 0%,
    50% 50%,
    80% 0%,
    100% 0%,
    50% calc(8.66 * 30px)
  );
}

.logo {
  position: relative;
  flex: 1;
  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;

    .wrapper {
      filter: drop-shadow(5px 5px 12px rgba(0, 0, 0, 0.7));
    }

    .triangle {
      position: absolute;
      width: 300px;
      height: 300px;
      transition: top 0.2s linear;
      box-shadow: none;
      &.backLayer {
        top: 0px;
        background-color: var(--purple);
        clip-path: var(--triangle);
      }

      &.middleLayer {
        top: -40px;
        background-color: var(--blue);
        clip-path: var(--triangle);
        text-align: center;
        line-height: 150px;
        font-size: 9rem;
        color: var(--white);
      }

      &.frontLayer {
        top: 20px;
        background-color: var(--green);
        clip-path: var(--hexagon);
      }
    }
    &:hover .backLayer {
      top: -15px;
      transition: top 0.2s linear;
    }
    &:hover .middleLayer {
      top: -100px;
      transition: top 0.2s linear;
    }
    &:hover .frontLayer {
      top: 70px;
      transition: top 0.2s linear;
    }
  }
}
</style>
