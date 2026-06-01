"use client";

import Image from "next/image";
import Link from "next/link";
import rightbg from "@/app/assets/rafael-as-martins-ibBxXnSndv4-unsplash.jpg";
const TrickPage = () => {
    return (
        <main className="trick-page">
            <div className="layout">
                <div className="media">
                    <Image
                        src={rightbg}
                        alt="Trick image"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <div className="content">
                    <Link href="/" className="back-link">
                        ← Back to home
                    </Link>

                    <div className="header">
                        <span className="icon">🎬</span>
                        <h1>
                            Get up to <span className="pct">100% back</span>
                        </h1>
                        <p className="tagline">
                            Post about Nondollar. Get views. We refund the premium you paid.
                        </p>
                    </div>

                    <div className="steps">
                        <div className="step">
                            <div className="step-icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="6" width="18" height="14" rx="2" stroke="white" strokeWidth="2" />
                                    <path d="M3 10h18" stroke="white" strokeWidth="2" />
                                    <circle cx="8" cy="15" r="1" fill="white" />
                                    <path d="M11 15h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="step-content">
                                <div className="step-title">Buy call on Nondollar</div>
                                <div className="step-body">
                                    Make any real trade on the platform. Premium paid will be eligible for refund based on the views your post gets.
                                </div>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L8 16M8 6h10v10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="step-content">
                                <div className="step-title">
                                    Post about it on X — tag <code><a href="https://x.com/nondollar_life" target="_blank" rel="noopener noreferrer">@nondollar</a></code>
                                </div>
                                <div className="step-body">
                                    Share your trade, your thesis, a screenshot — whatever feels real. Tag <strong><a href="https://x.com/nondollar_life" target="_blank" rel="noopener noreferrer">@nondollar</a></strong> and add <strong>#nondollar</strong> so we can find it. Honest beats hyped. Unhinged is fine. Templated copy isn&apos;t.
                                </div>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M12 3c0 5-4 6-4 11a4 4 0 0 0 8 0c0-3-1-4-2-5 0 1-1 2-2 2 0-2 2-4 0-8z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="step-content">
                                <div className="step-title">Cross the view threshold</div>
                                <div className="step-body">
                                    Hit <strong>2,000 views</strong> for a 50% refund. Hit <strong>10,000 views</strong> for the full premium back. Views must be organic — no paid promotion, no view bots.
                                </div>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M3 7l9 6 9-6M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7a2 2 0 012-2h14a2 2 0 012 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="step-content">
                                <div className="step-title">Email us for your refund</div>
                                <div className="step-body">
                                    Send an email to <code>refunds@nondollar.life</code> with the link to your post, your wallet address, and the transaction hash of the trade. We&apos;ll verify within 48 hours and credit the refund as USDC to your Nondollar account.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tiers">
                        <div className="tier">
                            <div className="tier-pct">50%</div>
                            <div className="tier-label">premium back</div>
                            <div className="tier-views">2,000 views on X</div>
                        </div>
                        <div className="tier gold">
                            <div className="tier-pct">100%</div>
                            <div className="tier-label">premium back</div>
                            <div className="tier-views">10,000 views on X</div>
                        </div>
                    </div>

                    <div className="example">
                        <div className="example-label">Example</div>
                        <div className="example-rows">
                            <div className="example-row">
                                <span className="l">Bought 10 NVDA $210 calls</span>
                                <span className="v">Premium $81.80</span>
                            </div>
                            <div className="example-row">
                                <span className="l">Posted on X · hit 12,400 views</span>
                                <span className="v">100% tier</span>
                            </div>
                            <div className="example-row total">
                                <span className="l">Refund credited</span>
                                <span className="v">+$81.80 USDC</span>
                            </div>
                        </div>
                    </div>

                    <div className="fineprint">
                        <strong>One refund per trade.</strong> View count is verified from public X analytics — no paid boosts, no view-bot services, no friend-rings (we can tell). Refund is paid as USDC credit on Nondollar, not cash. We may reject low-effort copy-paste posts. This program is funded from our marketing budget — sellers always receive their full premium.
                    </div>
                </div>
            </div>

            <style jsx>{`
        :global(:root) {
          --bg: #ffffff;
          --bg-soft: #f7f7f5;
          --ink: #0a1f15;
          --ink-soft: #2d3a33;
          --muted: #6b7670;
          --muted-2: #9aa39e;
          --line: #e5e8e6;
          --green: #1b7e3f;
          --green-deep: #0a4a1f;
        }

        .trick-page {
          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font-family: 'Inter', -apple-system, sans-serif;
        }

        .layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }

        .media {
          background: #1a1a1a;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content {
          padding: 40px 56px 56px;
          overflow-y: auto;
          background: var(--bg);
        }

        .back-link {
          color: var(--muted);
          font-size: 13px;
          text-decoration: none;
          margin-bottom: 36px;
          display: inline-block;
          transition: color 0.15s;
        }

        .back-link:hover {
          color: var(--ink);
        }

        .header {
          text-align: center;
          margin-bottom: 44px;
        }

        .header .icon {
          font-size: 36px;
          margin-bottom: 14px;
          display: block;
        }

        .header h1 {
          font-size: 44px;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.05;
          color: var(--ink);
          margin-bottom: 12px;
        }

        .header .pct {
          color: var(--green);
        }

        .header .tagline {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.5;
        }

        .steps {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-bottom: 48px;
        }

        .step {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 20px;
          align-items: start;
        }

        .step-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--green);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .step-icon svg {
          width: 26px;
          height: 26px;
        }

        .step-content {
          padding-top: 8px;
        }

        .step-title {
          font-size: 19px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 6px;
          letter-spacing: -0.015em;
        }

        .step-body {
          font-size: 14.5px;
          color: var(--muted);
          line-height: 1.55;
        }

        .step-body strong {
          color: var(--ink);
          font-weight: 600;
        }

        .step-body code {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 13px;
          padding: 2px 7px;
          background: var(--bg-soft);
          border-radius: 5px;
          color: var(--green-deep);
        }

        .step-body a {
          color: var(--green);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .tiers {
          background: var(--bg-soft);
          border-radius: 14px;
          padding: 24px;
          margin-bottom: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .tier {
          text-align: center;
          padding: 20px 12px;
          background: white;
          border-radius: 10px;
          border: 1px solid var(--line);
        }

        .tier.gold {
          border: 1.5px solid var(--green);
        }

        .tier-pct {
          font-size: 36px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.025em;
          line-height: 1;
          margin-bottom: 4px;
        }

        .tier.gold .tier-pct {
          color: var(--green);
        }

        .tier-label {
          font-size: 13px;
          color: var(--muted);
          font-weight: 500;
        }

        .tier-views {
          font-size: 11px;
          color: var(--muted-2);
          margin-top: 6px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .example {
          background: var(--bg-soft);
          border-radius: 12px;
          padding: 22px 24px;
          margin-bottom: 32px;
        }

        .example-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--green);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .example-rows {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13.5px;
        }

        .example-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .example-row .l {
          color: var(--muted);
        }

        .example-row .v {
          color: var(--ink);
          font-weight: 500;
        }

        .example-row.total {
          margin-top: 6px;
          padding-top: 12px;
          border-top: 1px dashed var(--line);
        }

        .example-row.total .l {
          color: var(--green);
          font-weight: 600;
        }

        .example-row.total .v {
          color: var(--green);
          font-weight: 700;
          font-size: 18px;
        }

        .fineprint {
          font-size: 12px;
          color: var(--muted-2);
          line-height: 1.7;
          padding-top: 24px;
          border-top: 1px solid var(--line);
        }

        .fineprint strong {
          color: var(--muted);
          font-weight: 500;
        }

        @media (max-width: 920px) {
          .layout {
            grid-template-columns: 1fr;
          }
          .media {
            min-height: 320px;
            max-height: 50vh;
          }
          .content {
            padding: 32px 24px 48px;
          }
          .header h1 {
            font-size: 32px;
          }
        }
      `}</style>
        </main>
    );
};

export default TrickPage;
