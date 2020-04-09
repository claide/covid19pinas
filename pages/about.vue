<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-8">
        <SimpleCard title="About the website">
          <div class="is-spacer-sm"></div>
          <p>This website gathers data from credible sources, official reports and outlets of government to provide the number of COVID19 cases, deaths and recoveries within the Philippines. As new situation is published, this website will be updated regularly.</p>
          <p>
            Feedbacks and corrections are welcome. Email me at
            <a
              class="has-text-green"
              href="mailto:magallen.fc@gmail.com"
            >magallen.fc@gmail.com</a>
          </p>
          <div class="is-spacer"></div>
          <p class="has-text-weight-bold">Sources</p>
          <ul>
            <li>(WHO) World Health Organization</li>
            <li>(DOH) Department of Health Philippines</li>
            <li>
              <a
                class="has-text-green"
                href="https://github.com/novelcovid/api"
                target="_blank"
              >NovelCOVID 19 API</a>
            </li>
            <li>
              <a
                class="has-text-green"
                href="https://github.com/sorxrob/coronavirus-ph-api"
                target="_blank"
              >Coronavirus Ph API</a>
            </li>
            <li>
              <a class="has-text-green" href="http://newsapi.org" target="_blank">News API</a>
            </li>
          </ul>
          <div class="is-spacer-sm"></div>
          <p class="has-text-weight-bold">Show your support</p>
          <p>
            Love the tracker? Express your support by donating any amount. Your donation can help to upgrade server hosting, domain and site's maintenance.
            <br />Stay safe all!
          </p>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_donations" />
            <input type="hidden" name="business" value="KQ2PKXZKDX2DW" />
            <input type="hidden" name="currency_code" value="PHP" />
            <input
              @click.prevent="trackDonation"
              type="image"
              src="https://i.ibb.co/Lp9qLkN/donate.png"
              border="0"
              name="submit"
              title="PayPal - The safer, easier way to pay online!"
              alt="Donate with PayPal button"
            />
            <img
              alt
              border="0"
              src="https://www.paypal.com/en_PH/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
        </SimpleCard>
      </div>
    </div>
  </section>
</template>

<script>
import SimpleCard from '@/components/SimpleCard'

export default {
  name: 'About',
  head() {
    return {
      title: 'About'
    }
  },
  components: { SimpleCard },
  methods: {
    trackDonation() {
      const url = 'https://www.paypal.com/cgi-bin/webscr'
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
