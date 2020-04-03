module.exports = function softDelete(Schema) {
    Schema.add({deleted: Boolean});
    Schema.add({deletedAt: Date});

    Schema.pre("save", function (next) {
        if(!this.deleted) {
            this.deleted = false;
        }
        if(!this.deletedAt) {
            this.deletedAt = null;
        }
        next();
    });

    Schema.methods.softdelete = function(callback) {
        this.deleted = true;
        this.deletedAt = new Date();
        this.save(callback);
    };

    Schema.methods.restore = function(callback) {
        this.deleted = false;
        this.deletedAt = null;
        this.save(callback);
    };

    Schema.query.isDeleted = function(cond = false) {
        return this.find({
            deleted: cond
        });
    };
};
