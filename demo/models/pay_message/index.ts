/* eslint-disable lines-between-class-members */
/* eslint-disable max-classes-per-file */
import HttpClient from 'secure-http-client';

const {
  ApiModel, mapping, array, number, object,
} = HttpClient;

const BaseConfigDefault = {
  maxStickyMessages: 500,
  defaultChargesLevel: 2,
  charges: [],
};

@mapping({
  coins: 'base_config.charges.coins',
  emotion: 'base_config.charges.emotion',
  level: 'base_config.charges.level',
  stickyTime: 'base_config.charges.sticky_time',
})
export class ChargesItem {
  @number() coins = 300;
  @number() emotion = 0;
  @number() level = 1;
  @number() stickyTime = 0;
}

@mapping({
  charges: 'base_config.charges',
  maxStickyMessages: 'base_config.max_sticky_messages',
  defaultChargesLevel: 'base_config.default_charges_level',
})
class BaseConfig {
  @array({ model: ChargesItem }) charges: ChargesItem[] = [
    {
      coins: 600, emotion: 1, level: 2, stickyTime: 120,
    },
  ];
  @number() maxStickyMessages = 500;
  @number() defaultChargesLevel = 2;
}

@mapping({
  baseConfig: 'base_config',
  switch: 'switch',
})
export default class PayMessageConfig extends ApiModel {
  @number() switch = 0;
  @object({ model: BaseConfig }) baseConfig: BaseConfig = BaseConfigDefault;
}
