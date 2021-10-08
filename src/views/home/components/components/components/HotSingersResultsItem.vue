<template>
  <div class="HotSingersResultsItem-wrap">
    <!-- 1歌手照片 -->
    <div class="t1_photowrap">
      <img class="t1_photo" :src="currentArtistDetail?currentArtistDetail.artist.cover:''" :style="{opacity:photoOpacity}">
    </div>
    <!-- 2歌手简介 -->
    <div class="t2_describe">
      <div class="t2_describe_name">{{currentArtistDetail?currentArtistDetail.artist.name:''}}</div>
      <div class="t2_describe_brief">{{currentArtistDetail?(currentArtistDetail.identify?currentArtistDetail.identify.imageDesc:''):''}}</div>
      <div class="t2_describe_focus">+ 关注</div>
    </div>
    <!-- 占位div -->
    <div class="holdroom" ref="holdroom"></div>
    <!-- 3主内容 -->
    <div class="t3-main">
      <van-tabs v-model="tagActive" @click="onMV">
        <!-- 3_1歌曲标签 -->
        <van-tab title="歌曲">
          <!-- 3_1_1列表开始播放全部 -->
          <van-cell mymark3>
            <van-icon class-prefix="toutiao" name="24gf-playCircle" color="red" size="0.74rem" slot="icon" />
            <div slot="title" style="marginLeft:0.26rem;fontSize:0.48rem;fontWeight:bold">播放全部</div>
            <div slot="default" style="display:flex;alignItems:center;justifyContent:flex-end">
              <van-icon class-prefix="toutiao" name="bofang" color="green" size="0.74rem"></van-icon>
              <van-icon name="certificate" size="0.74rem" />
            </div>
          </van-cell>
          <!-- 3_1_2歌曲列表 -->
          <van-list v-model="songLoading" :finished="songFinished" finished-text="没有更多了" @load="onSongs">
            <MusicItem
              v-for="(track, index) in artistSongs"
              :key="index"
              :trackIndex="index"
              :trackName="track.name"
              :artistName="track.ar[0].name"
              :albumName="track.al.name"
              :trackId="track.id"
            ></MusicItem>
          </van-list>
        </van-tab>
        <!-- 3_2主页标签 -->
        <van-tab title="主页">
          <div class="t3_2-main_host">
            <h4>艺人简介</h4>
            <div>{{currentArtistDetail?currentArtistDetail.artist.briefDesc:''}}</div>
          </div>
        </van-tab>
        <!-- 3_3专辑标签 -->
        <van-tab>
          <!-- 3_3_1专辑tag标题 -->
          <div slot="title" class="t3_3_1-albumtitlewrap">
            <span>专辑</span>
            <van-icon name="circle" :badge="currentArtistDetail?currentArtistDetail.artist.albumSize:''" color="transparent" class="t3_3-zhaunjiwrap_icon"></van-icon>
          </div>
          <!-- 3_3_2专辑内容 -->
          <div class="t3_3_2-albumlistwrap">
            <van-list
              v-model="loading"
              :finished="albumFinished"
              finished-text="没有更多了"
              @load="albumUpload"
            >
              <AlbumItem
                v-for="(item, index) in artistAlbums"
                :key="index"
                :index="index"
                :albumName="item.name"
                :artistName="item.artist.name"
                :albumCover="item.picUrl"
                :publishTime="item.publishTime"
                :albumSize="item.size"
              ></AlbumItem>
            </van-list>
          </div>
        </van-tab>
        <!-- 3_4视频标签 -->
        <van-tab>
          <!-- 3_4_1视频tag标题 -->
          <div slot="title" class="t3_4_1-vediotagwrap">
            <span>视频</span>
            <van-icon name="circle" :badge="currentArtistDetail?currentArtistDetail.videoCount:''" color="transparent" class="t3_4_1-vediotagwrap_icon"></van-icon>
          </div>
          <!-- 3_4_2视频内容 -->
          <div slot="default" class="t3_4_2-vediocontentwrap">
            <van-grid :column-num="2" icon-size="150" :border="false">
              <MvItem
                v-for="(mv, index) in artistMVs"
                :key="index"
                :index="index"
                :cover="mv.imgurl"
                :playCount="mv.playCount"
                :duration="mv.duration"
                :mvName="mv.name"
                :singerName="currentArtistDetail.artist.name"
                :singerPhoto="currentArtistDetail.artist.cover"
                :vid="mv.id"
                :uid="mv.artist.id"
              ></MvItem>
            </van-grid>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getSingerDetail, getAllSongs, getSingerAlbums, getSingerMVs } from '@/api/singers.js'
import { mapMutations } from 'vuex'
import MusicItem from '@/components/MusicItem.vue'
import AlbumItem from '@/components/AlbumItem.vue'
import MvItem from '@/components/MvItem.vue'
export default {
  name: 'HotSingersResultsItem',
  components: { MusicItem, AlbumItem, MvItem },
  props: ['currentArtist'],
  data () {
    return {
      photoOpacity: 1,
      tagActive: 0, // 选取得内容标签
      currentArtistDetail: null, // 歌手详情
      //
      artistSongs: [], // 歌手所有歌曲
      songLoading: false, // 控制歌曲列表下拉加载
      songOffset: 0, // 歌曲下拉偏移量
      songFinished: false, // 控制歌曲列表是否全部加载
      //
      artistAlbums: [], // 歌手专辑
      artistMVs: [], // 歌手全部MV只有10个
      loading: false, // 控制专辑列表下拉加载
      albumFinished: false, // 控制专辑列表是否全部加载
      albumOffset: 0 // 专辑下拉偏移量
    }
  },
  methods: {
    ...mapMutations(['setCurrentPlayItems']),
    // 获取歌手详情
    async onSingerInfo () {
      const singerId = this.currentArtist.id
      const [detailRes] = await Promise.all([getSingerDetail(singerId)]) // 获取歌手描述和歌曲
      this.currentArtistDetail = detailRes.data.data
    },
    // 获取歌手所有歌曲
    async onSongs () {
      const { data } = await getAllSongs({
        id: this.currentArtist.id,
        order: 'hot',
        limit: 20,
        offset: this.songOffset
      })
      console.log('song', data)
      this.artistSongs.push(...data.songs)
      this.songOffset += 20
      // 加载状态结束
      this.songLoading = false
      // 数据全部加载完成
      if (!data.songs.length) {
        this.albumFinished = true
      }
    },
    // 获取专辑列表和上拉加载更多
    async albumUpload () {
      const { data } = await getSingerAlbums({
        id: this.currentArtistDetail.artist.id,
        limit: 20,
        offset: this.albumOffset
      })
      this.artistAlbums.push(...data.hotAlbums)
      this.albumOffset += 20

      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (!data.hotAlbums.length) {
        this.albumFinished = true
      }
    },
    // 获取歌手MV
    async onMV (index) {
      if (index === 3) {
        const { data } = await getSingerMVs(this.currentArtistDetail.artist.id)
        this.artistMVs = data.mvs
      }
    }
  },
  mounted () {
    this.onSingerInfo() // 载入歌手详情
  }
}
</script>

<style scoped lang="less">
/* .HotSingersResultsItem-wrap {
  height: 2000px;
} */
// 1照片
.t1_photowrap{
  background-color: #fff;
  .t1_photo {
    width: 100%;
    height: 220px;
    object-fit: cover;
  }
}

// 2简介
.t2_describe {
  position: absolute;
  left: 23px;
  top: 180px;
  z-index: 2224;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 100px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  .t2_describe_name { // 姓名
    font-size: 20px;
    font-weight: bold;
  }
  .t2_describe_brief { // 介绍
    color: #bbb;
    font-size: 14px;
    margin: 5px 0;
  }
  .t2_describe_focus { // 关注
    background-color: red;
    width: 80px;
    font-size: 14px;
    text-align: center;
    padding: 5px;
    border-radius: 20px;
  }
}

// 占位div
.holdroom {
  position: sticky;
  z-index: 2221;
  top: -20px;
  width: 100%;
  height: 70px;
  background-color: #fff;
}

// 3主要内容
.t3-main {
  /deep/.van-tabs__wrap { // 4个tag标题容器
    position: sticky;
    top: 50px;
    z-index: 2223;
  }
  // 3_2主页
  .t3_2-main_host { // 包含标题和正文
    padding: 0 15px 30px;
    font-size: 14px;
  }
  // 3_3专辑
  // 3_3_1专辑tag标题
  .t3_3_1-albumtitlewrap { // 整个专辑tag标题容器
    position: relative;
    padding: 10px 20px;
    .t3_3-zhaunjiwrap_icon { // 右上角数字
      position: absolute;
      right: 15px;
    }
  }
  // 3_3_2专辑内容
  .t3_3_2-albumlistwrap { // 专辑列表
    padding: 0 10px;
  }
  // 3_4_1视频tag标题 -->
  .t3_4_1-vediotagwrap { // 整个视频tag标题容器
    position: relative;
    padding: 10px 20px;
    .t3_4_1-vediotagwrap_icon { // 右上角数字
      position: absolute;
      right: 15px;
    }
}
  // 3_4_2视频内容
  .t3_4_2-vediocontentwrap { // 包含整个视频内容
    padding: 10px 5px 20px 5px;
  }
}
</style>
