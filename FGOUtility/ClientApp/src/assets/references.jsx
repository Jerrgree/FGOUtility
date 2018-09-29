﻿const materials = [
    { name: "Proof", displayName: "Proof Of Hero" },
    { name: "Bone", displayName: "Evil Bone" },
    { name: "Fang", displayName: "Dragon Fang" },
    { name: "Dust", displayName: "Void's Dust" },
    { name: "Chain", displayName: "Fool's Chain" },
    { name: "Stinger", displayName: "Stinger" },
    { name: "Fluid", displayName: "Fluid" },
    { name: "Stake", displayName: "Stake" },
    { name: "Gunpowder", displayName: "Gunpowder" },
    { name: "Seed", displayName: "Seed of Yggdrasil" },
    { name: "Lantern", displayName: "Ghost Lantern" },
    { name: "Crystal", displayName: "Octuplet Crystals" },
    { name: "Jewel", displayName: "Serpent Jewel" },
    { name: "Feather", displayName: "Pheonix Feather" },
    { name: "Gear", displayName: "Eternal Gear" },
    { name: "Page", displayName: "Forbidden Page" },
    { name: "Baby", displayName: "Homunculus Baby" },
    { name: "Horseshoe", displayName: "Meteor Horseshoe" },
    { name: "Medal", displayName: "Great Knight Medal" },
    { name: "Shell", displayName: "Shell of Reminiscence" },
    { name: "Magatama", displayName: "Magatama" },
    { name: "Permafrost", displayName: "Permafrost" },
    { name: "Ring", displayName: "Ring" },
    { name: "Steel", displayName: "Steel" },
    { name: "Claw", displayName: "Claw of Chaos" },
    { name: "Heart", displayName: "Heart of the Foreign God" },
    { name: "Scale", displayName: "Dragon's Reversal Scale" },
    { name: "Root", displayName: "Spirit Root" },
    { name: "Horn", displayName: "Warehorse's Young Horn" },
    { name: "Tearstone", displayName: "Tearstone of Blood" },
    { name: "Grease", displayName: "Black Beast Grease" },
    { name: "Lamp", displayName: "Lamp of Evil Sealing" },
    { name: "Scarab", displayName: "Scarab of Wisdom" },
    { name: "Lanugo", displayName: "Lanugo" },
    { name: "Cholecyst", displayName: "Cholecyst" },
    { name: "Wine", displayName: "Wine" },
];

const classPieces = [
    { name: "SaberPiece", displayName: "Saber Piece" },
    { name: "ArcherPiece", displayName: "Archer Piece" },
    { name: "LancerPiece", displayName: "Lancer Piece" },
    { name: "RiderPiece", displayName: "Rider Piece" },
    { name: "CasterPiece", displayName: "Caster Piece" },
    { name: "AssassinPiece", displayName: "Assassin Piece" },
    { name: "BerserkerPiece", displayName: "Berseker Piece" },
    { name: "SaberMonument", displayName: "Saber Monument" },
    { name: "ArcherMonument", displayName: "Archer Monument" },
    { name: "LancerMonument", displayName: "Lancer Monument" },
    { name: "RiderMonument", displayName: "Rider Monument" },
    { name: "CasterMonument", displayName: "Caster Monument" },
    { name: "AssassinMonument", displayName: "Assassin Monument" },
    { name: "BerserkerMonument", displayName: "Berseker Monument" },
    { name: "GemOfSaber", displayName: "Gem Of Saber" },
    { name: "GemOfArcher", displayName: "Gem Of Archer" },
    { name: "GemOfLancer", displayName: "Gem Of Lancer" },
    { name: "GemOfRider", displayName: "Gem Of Rider" },
    { name: "GemOfCaster", displayName: "Gem Of Caster" },
    { name: "GemOfAssassin", displayName: "Gem Of Assassin" },
    { name: "GemOfBerserker", displayName: "Gem Of Berserker" },
    { name: "MagicGemOfSaber", displayName: "Magic Gem Of Saber" },
    { name: "MagicGemOfArcher", displayName: "Magic Gem Of Archer" },
    { name: "MagicGemOfLancer", displayName: "Magic Gem Of Lancer" },
    { name: "MagicGemOfRider", displayName: "Magic Gem Of Rider" },
    { name: "MagicGemOfCaster", displayName: "Magic Gem Of Caster" },
    { name: "MagicGemOfAssassin", displayName: "Magic Gem Of Assassin" },
    { name: "MagicGemOfBerserker", displayName: "Magic Gem Of Berserker" },
    { name: "SecretGemOfSaber", displayName: "Secret Gem Of Saber" },
    { name: "SecretGemOfArcher", displayName: "Secret Gem Of Archer" },
    { name: "SecretGemOfLancer", displayName: "Secret Gem Of Lancer" },
    { name: "SecretGemOfRider", displayName: "Secret Gem Of Rider" },
    { name: "SecretGemOfCaster", displayName: "Secret Gem Of Caster" },
    { name: "SecretGemOfAssassin", displayName: "Secret Gem Of Assassin" },
    { name: "SecretGemOfBerserker", displayName: "Secret Gem Of Berserker" },
]

export function GetMaterials() {
    return materials;
}

export function GetClassPieces() {
    return classPieces;
}