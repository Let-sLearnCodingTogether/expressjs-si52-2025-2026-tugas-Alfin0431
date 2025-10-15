import Kamus from "../models/kamusModel.js";
import mongoose from "mongoose";

export const createKamus = async (req, res) => {
    try {
        const { term, definition, Source } = req.body; 
        
        if (!term || !definition) {
            return res.status(400).json({ message: "Istilah & Definisi Wajib Diisi" });
        }
        
        const existingTerm = await Kamus.findOne({ term: term.trim() });
        if (existingTerm) {
            return res.status(400).json({ message: "Istilah sudah ada dalam kamus" });
        }

        const newKamus = await Kamus.create({
            term,
            definition,
            Source,
            user: req.user.id 
        });

        res.status(201).json({ 
            message: "Istilah berhasil ditambahkan", 
            data: newKamus 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
};

export const getKamus = async (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message : "ID tidak valid"});
        }
        
        const kamusItem = await Kamus.findOne({ _id: id, user: req.user.id });

        if (!kamusItem) {
            return res.status(404).json({ message: "Istilah tidak ditemukan atau bukan milik Anda" });
        }

        res.status(200).json({
            message: "Istilah ditemukan",
            data : kamusItem 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
};
         
export const updateKamus = async (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message : "ID tidak valid"});
        }

        const kamusItem = await Kamus.findById(id); 
        if (!kamusItem) { 
            return res.status(404).json({ message: "Istilah tidak ditemukan" });
        }
        if (kamusItem.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Akses ditolak" });  
        }

        const updatedKamus = await Kamus.findOneAndUpdate({
            _id: id, user: req.user.id },
            {
                term: req.body.term,
                definition: req.body.definition,
                Source: req.body.Source
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Istilah berhasil diperbarui",
            data : updatedKamus 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteKamus = async (req, res) => {
    try {
        const { id } = req.params;
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message : "ID tidak valid"});
        }

        const kamusItem = await Kamus.findById(id);

        if (!kamusItem) {
            return res.status(404).json({ message: "Istilah tidak ditemukan" });
        }

        if (kamusItem.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Akses ditolak" });  
        }

        await kamusItem.deleteOne(); 

        res.status(200).json({ 
            message: "Istilah berhasil dihapus",
            data: null 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};