<template>
  <section class="section">
    <div class="columns">
      <div class="column is-3">
        <div class="content">
          <h3 class="has-text-white">COVID19 hotlines</h3>
          <ul>
            <li>1555 (PLDT, Smart, Sun, and TnT)</li>
            <li>(02) 894-26843 (894-COVID)</li>
          </ul>
          <h3 class="has-text-white">Resources</h3>
          <div class="columns">
            <div class="column">
              <ul>
                <li>
                  <a
                    class="has-text-primary"
                    href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                    target="_blank"
                  >COVID19 WHO</a>
                </li>
                <li>
                  <a class="has-text-primary" href="https://www.doh.gov.ph/2019-nCoV">COVID19 DOH</a>
                </li>
                <li>
                  <a
                    class="has-text-primary"
                    href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
                    target="_blank"
                  >Myth Busters</a>
                </li>
                <li>
                  <a
                    class="has-text-primary"
                    href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
                    target="_blank"
                  >How to use Mask</a>
                </li>
                <li>
                  <a
                    class="has-text-primary"
                    href="https://doh.gov.ph/2019-nCov/interim-guidelines"
                    target="_blank"
                  >Interim Guidelines</a>
                </li>
                <li>
                  <a
                    class="has-text-primary"
                    href="https://www.doh.gov.ph/sites/default/files/Updated_Decision_Tool_March_16.pdf"
                    target="_blank"
                  >COVID19 Screening Tool</a>
                </li>
                <li>
                  <a
                    class="has-text-primary"
                    href="https://doh.gov.ph/2019-nCov/advisories"
                    target="_blank"
                  >Public Advisories</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <News />
      </div>
    </div>
  </section>
</template>

<script>
import News from '@/components/News'

export default {
  name: 'UsefulResources',
  head() {
    return {
      title: 'Useful Resources'
    }
  },
  components: { News }
}
</script>
