const _ = require('lodash'),

      { loyalty_cards, rewards } = require('./input.json');

function getTotalPointsByUserId(userId) {
    return _.reduce(rewards, (total, reward) => {
        if(reward.user_id == userId) return total + reward.points;
        return total;
    }, 0);
}

function getTotalPointsByLoyaltyCardId(loyaltyCardId) {
    return _.reduce(rewards, (total, reward) => {
        if(reward.loyalty_card_id == loyaltyCardId) return total + reward.points;
        return total;
    }, 0);
}

function getTotalPointsByUserdIdAndLoyaltyCardId(userId, loyaltyCardId) {
    return _.reduce(rewards, (total, reward) => {
        if(reward.loyalty_card_id == loyaltyCardId && reward.user_id == userId) return total + reward.points;
        return total;
    }, 0);
}

function getLoyaltyCard(loyaltyCardId, userId) {
    const loyalty_card = { ..._.find(loyalty_cards, { 'id': loyaltyCardId }) };
        
    loyalty_card.points = userId ? getTotalPointsByUserdIdAndLoyaltyCardId(userId, loyaltyCardId)
                                 : getTotalPointsByLoyaltyCardId(loyaltyCardId);

    return loyalty_card;
}

function getLoyaltyCardsByUserId(userId) {
    const loyaltyCardIds = _(rewards).filter(reward => {
                                        if(reward.user_id == userId) return reward.loyalty_card_id;
                                    }).map('loyalty_card_id')
                                    .uniq().value();
    
    return  _.map(loyaltyCardIds, loyaltyCardId => {
        return getLoyaltyCard(loyaltyCardId, userId);
    })
}

function generateOutput(userId, loyaltyCardId) {
    return {
        user: {
            id: userId,
            total_points: getTotalPointsByUserId(userId),
            loyalty_cards: getLoyaltyCardsByUserId(userId)
        },
        loyalty_card: getLoyaltyCard(loyaltyCardId)
    }
}

exports.generateOutput = generateOutput;