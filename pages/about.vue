<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-8">
        <SimpleCard title="About the Website">
          <div class="is-spacer-sm"></div>
          <p class="has-text-black">
            This website gathers data from credible sources, official reports and outlets of government to provide the number of COVID19 cases, deaths and recoveries within the Philippines.
            All COVID-19 data in this website changes quickly and might not reflect some cases that is still being reported.
          </p>
          <p class="has-text-weight-bold has-text-black">Why data is different from another sources?</p>
          <p class="has-text-black">
            There are different sources which monitor and aggregate data on coronavirus.
            We download at various times and probably have various ways to collect data.
          </p>
          <p class="has-text-black">
            Feedbacks and corrections are welcome. Email me at
            <a
              class="has-text-primary"
              href="mailto:magallen.fc@gmail.com"
            >magallen.fc@gmail.com</a>
          </p>
          <div class="is-spacer-sm"></div>
          <p class="has-text-weight-bold has-text-black">Sources</p>
          <ul>
            <li>(WHO) World Health Organization</li>
            <li>
              <a
                class="has-text-primary"
                href="https://www.doh.gov.ph/covid19tracker"
                target="_blank"
              >DOH COVID-19 Tracker</a>
            </li>
            <li>
              <a
                class="has-text-primary"
                href="https://corona.lmao.ninja/"
                target="_blank"
              >Novel COVID API</a>
            </li>
            <li>
              <a class="has-text-primary" href="http://newsapi.org" target="_blank">News API</a>
            </li>
          </ul>
          <div class="is-spacer-sm"></div>
          <p class="has-text-weight-bold has-text-black">Show your Support</p>
          <p class="has-text-black">
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
