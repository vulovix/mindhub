import React from 'react';

import Button from 'shared/components/Button';
import Tooltip from 'shared/components/Tooltip';

import feedbackImage from './assets/feedback.png';
import { FeedbackDropdown, FeedbackImageCont, FeedbackImage, FeedbackParagraph } from './Styles';

const AboutTooltip = tooltipProps => (
  <Tooltip
    width={300}
    {...tooltipProps}
    renderContent={() => (
      <FeedbackDropdown>
        <FeedbackImageCont>
          <FeedbackImage src={feedbackImage} alt="Give feedback" />
        </FeedbackImageCont>

        <FeedbackParagraph>
          Workspace project is built with React on the front-end and Node/TypeScript on the
          back-end.
        </FeedbackParagraph>

        <FeedbackParagraph>
          {'Read more on my website or reach out via '}
          <a href="mailto:contact@komplexica.com">
            <strong>contact@komplexica.com</strong>
          </a>
        </FeedbackParagraph>

        <a href="https://mindhub.dev" target="_blank" rel="noreferrer noopener">
          <Button variant="primary">Visit Website</Button>
        </a>

        <a href="https://github.com/vulovix/mindhub" target="_blank" rel="noreferrer noopener">
          <Button style={{ marginLeft: 10 }} icon="github">
            Github Repo
          </Button>
        </a>
      </FeedbackDropdown>
    )}
  />
);

export default AboutTooltip;
