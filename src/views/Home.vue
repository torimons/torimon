<template>
  <v-app>
    <v-app-bar
      app
      flat
      color="primary"
      dark
    >
      <v-toolbar-title>TORIMON</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <div class="header">
        <v-container fluid>
          <v-row
            align="center"
            justify="center"
            style="height: 600px"
          >
            <v-col
              class="text-center"
              cols="12"
              lg="8"
            >
              <h2 class="header-title">Torimon</h2>
              <div class="header-content">
                <p>Torimonは、地図を自由に作り、そして使うことができるサービスです。</p>
                <p>自分用の地図を作ったり、他の人が公開した地図を利用することができます。</p>
              </div>
              <v-btn
                class="use"
                x-large
                color="primary"
                to="/map-select"
              >
                Let's try!
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container fluid>
        <v-row
          justify="center"
        >
          <v-col
            cols="12"
            class="text-center"
          >
            <h1 class="main-title">地図を作る</h1>
            <div class="main-content">
              <v-row>
                <v-col>
                  <p>自分の好きなように地図を作成してみましょう。</p>
                  <p>好きな場所にピンを立てる、部屋の概形を描くといったことができます。</p>
                  <p>既存の地図を編集することも可能です。</p>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="11" md="5">
                  <v-card>
                    <v-img :src="require('@/assets/home/make-spot.png')"/>
                  </v-card>
                </v-col>
                <v-col cols="11" md="5">
                  <v-card >
                    <v-img
                      :src="require('@/assets/home/edit-detailmap.png')"
                    />
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row
          justify="center"
        >
          <v-col
            cols="12"
            class="text-center"
          >
            <h1 class="main-title">地図を使う</h1>
            <div class="main-content">
              <v-row >
                <v-col>
                  <p>自分で作った地図を使うことも、他の人が公開した地図を使うこともできます。</p>
                  <p>地図に階層情報が含まれている場合、ズームインすることで詳細な地図に切り替わります。</p>
                  <p>検索することでより素早く目的の場所にたどりつけます。</p>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="11" md="5">
                  <v-card>
                    <v-img :src="require('@/assets/home/floor-switch.png')"/>
                  </v-card>
                </v-col>
                <v-col cols="11" md="5">
                  <v-card>
                    <v-img
                      :src="require('@/assets/home/search-spot.png')"
                    />
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="12" class="text-center">
            <v-btn
              class="use"
              x-large
              color="primary"
              to="/map-select"
            >
              Let's try!
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer
      inset
      app
    >
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
@Component({
    components: {
    },
})
export default class Home extends Vue {
}
</script>

<style scoped>
.header-title {
  font-size: 4.5rem;
  margin-bottom: 3rem;
  color: #3F8373;
}
.header-content {
  font-size: 1.5rem;
  margin-bottom: 3rem;
}
.header {
  background-image: url("~@/assets/home/header-img.png");
  background-size: cover;
  position: relative;
  z-index: 0;
  margin-bottom: 2rem;
}
.header::before{
  content: "";
  position: absolute;
  z-index: -1;
  top: -3px;
  bottom: -3px;
  left: -3px;
  right: -3px;
  background: inherit;
  filter: blur(3px);
}
.main-title {
  font-size: 3rem;
  color: #3F8373;
}
.main-content {
  font-size: 1.3rem;
}
</style>
