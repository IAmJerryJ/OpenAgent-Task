function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="space-y-6">
          <div className="text-sm">© 2025 OpenAgent</div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Disclaimer
            </h3>

            <div className="space-y-3 text-sm text-left max-w-3xl mx-auto">
              <p>
                * The number of 2 million Australians is based on the number of
                users visiting OpenAgent according to Google Analytics for the
                period of 01/07/2024 to 30/06/2025.
              </p>

              <p>
                # The claim of #1 Agent comparison site is made based on data
                from Similar Web which shows more visits to OpenAgent than other
                agent comparison websites for the period of 1/06/2024 to
                30/5/2025.
              </p>

              <p>
                ^ Note: When a property is sold, the successful real estate
                agent pays OpenAgent an 20-30% variable referral fee (plus GST).
                This allows us to offer our service to homeowners at no cost.
              </p>

              <p>
                Some agents pay us for a premium subscription which means they
                will always appear in the recommendation set. To be eligible for
                the premium subscription, they must satisfy certain benchmarks
                and then maintain the highest level of quality. This is measured
                through user feedback, quantity of sales and other proprietary
                data. These agents are identified as 'Premier Agents' when they
                are recommended or displayed to you online.
              </p>

              <p>
                Other agents can pay to 'sponsor a suburb'. Where an agent is
                paying to appear, they will be identified as 'Sponsored'.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
