<template>
  <div>
    <div class="content">
      <h3 class="has-text-white">COVID19 Latest News</h3>
    </div>
    <div v-for="news in newsData" :key="newsData.title" class="card is-news is-horizontal">
      <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
      <div class="card-image">
        <figure class="image">
          <img :src="news.urlToImage" />
        </figure>
      </div>
      <div class="card-content">
        <h2 class="news-title">
          <a :href="news.url" target="_blank">{{ news.title }}</a>
        </h2>
        <p class="has-text-body" style="margin-bottom: 16px">
          <a :href="news.url" target="_blank" class="has-text-body news-link">{{ news.source.name }}</a>
          &#9679; {{ news.publishedAt | moment('LLLL') }}
        </p>
        <p class="has-text-body">{{ news.content | trunc(255, '...') }}</p>
        <!-- <p>{{ news.content }}</p> -->
        <div class="is-spacer-sm"></div>
        <a
          :href="news.url"
          @click.prevent="trackNews"
          target="_blank"
          class="button is-primary"
        >Read more</a>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      isLoading: false,
      isFullPage: true,
      newsData: []
    }
  },
  mounted() {
    this.fetchNews()
  },
  filters: {
    trunc(text, length, suffix) {
      return text.substring(0, length) + suffix
    }
  },
  methods: {
    fetchNews() {
      this.isLoading = true
      Axios.get(
        `https://newsapi.org/v2/top-headlines?country=ph&category=health&apiKey=1330ba6119944d8087adf9bb44f557df`
      ).then(response => {
        this.newsData = response.data.articles.filter(
          article => article.content
        )
        this.isLoading = false
      })
    },
    trackNews() {
      const url = this.news.url
      this.$ga.query('send', 'event', 'outbound', 'click', url, {
        transport: 'beacon',
        hitCallback() {
          document.location = url
        }
      })
    }
  }
}
</script>
