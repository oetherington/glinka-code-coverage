var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   20","line":"const Visibility = @import(\"../../common/node.zig\").Visibility;"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"pub const InferContext = struct {"},
{"lineNum":"   23","line":"    pub const Variant = enum {"},
{"lineNum":"   24","line":"        None,"},
{"lineNum":"   25","line":"        New,"},
{"lineNum":"   26","line":"        Class,"},
{"lineNum":"   27","line":"    };"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    pub const Data = union(Variant) {"},
{"lineNum":"   30","line":"        None: void,"},
{"lineNum":"   31","line":"        New: void,"},
{"lineNum":"   32","line":"        Class: Type.Ptr,"},
{"lineNum":"   33","line":"    };"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    parent: ?*const InferContext,"},
{"lineNum":"   36","line":"    data: Data,"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    pub fn none(parent: ?*const InferContext) InferContext {","class":"lineCov","hits":"1","order":"3222","possible_hits":"1",},
{"lineNum":"   39","line":"        return InferContext{","class":"lineCov","hits":"1","order":"3225","possible_hits":"1",},
{"lineNum":"   40","line":"            .parent = parent,","class":"lineCov","hits":"1","order":"3223","possible_hits":"1",},
{"lineNum":"   41","line":"            .data = Data{ .None = {} },","class":"lineCov","hits":"1","order":"3224","possible_hits":"1",},
{"lineNum":"   42","line":"        };"},
{"lineNum":"   43","line":"    }"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    pub fn new(parent: ?*const InferContext) InferContext {","class":"lineCov","hits":"1","order":"6439","possible_hits":"1",},
{"lineNum":"   46","line":"        return InferContext{","class":"lineCov","hits":"1","order":"6442","possible_hits":"1",},
{"lineNum":"   47","line":"            .parent = parent,","class":"lineCov","hits":"1","order":"6440","possible_hits":"1",},
{"lineNum":"   48","line":"            .data = Data{ .New = {} },","class":"lineCov","hits":"1","order":"6441","possible_hits":"1",},
{"lineNum":"   49","line":"        };"},
{"lineNum":"   50","line":"    }"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    pub fn class(parent: ?*const InferContext, ty: Type.Ptr) InferContext {","class":"lineCov","hits":"1","order":"6447","possible_hits":"1",},
{"lineNum":"   53","line":"        return InferContext{","class":"lineCov","hits":"1","order":"6450","possible_hits":"1",},
{"lineNum":"   54","line":"            .parent = parent,","class":"lineCov","hits":"1","order":"6448","possible_hits":"1",},
{"lineNum":"   55","line":"            .data = Data{ .Class = ty },","class":"lineCov","hits":"1","order":"6449","possible_hits":"1",},
{"lineNum":"   56","line":"        };"},
{"lineNum":"   57","line":"    }"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    pub fn getType(self: InferContext) Variant {","class":"lineCov","hits":"1","order":"5060","possible_hits":"1",},
{"lineNum":"   60","line":"        return @as(Variant, self.data);","class":"lineCov","hits":"1","order":"5061","possible_hits":"1",},
{"lineNum":"   61","line":"    }"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    pub fn isConstructible(self: InferContext) bool {","class":"lineCov","hits":"1","order":"5058","possible_hits":"1",},
{"lineNum":"   64","line":"        return self.getType() == .New;","class":"lineCov","hits":"1","order":"5059","possible_hits":"1",},
{"lineNum":"   65","line":"    }"},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"    fn hasProtectedAccessTo(self: InferContext, ty: Type.Ptr) bool {","class":"lineCov","hits":"1","order":"6476","possible_hits":"1",},
{"lineNum":"   68","line":"        if (self.getType() == .Class and","class":"lineCov","hits":"3","order":"6477","possible_hits":"3",},
{"lineNum":"   69","line":"            (self.data.Class == ty or self.data.Class.Class.isSubclassOf(ty)))","class":"lineCov","hits":"2","order":"6478","possible_hits":"2",},
{"lineNum":"   70","line":"            return true;","class":"lineCov","hits":"1","order":"6479","possible_hits":"1",},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"6488","possible_hits":"2",},
{"lineNum":"   73","line":"            return parent.hasProtectedAccessTo(ty);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"        return false;","class":"lineCov","hits":"1","order":"6489","possible_hits":"1",},
{"lineNum":"   76","line":"    }"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    fn hasPrivateAccessTo(self: InferContext, ty: Type.Ptr) bool {","class":"lineCov","hits":"1","order":"6499","possible_hits":"1",},
{"lineNum":"   79","line":"        if (self.getType() == .Class and self.data.Class == ty)","class":"lineCov","hits":"3","order":"6500","possible_hits":"3",},
{"lineNum":"   80","line":"            return true;","class":"lineCov","hits":"1","order":"6501","possible_hits":"1",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"        if (self.parent) |parent|","class":"lineCov","hits":"2","order":"6504","possible_hits":"2",},
{"lineNum":"   83","line":"            return parent.hasPrivateAccessTo(ty);","class":"lineCov","hits":"1","order":"6509","possible_hits":"1",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"        return false;","class":"lineCov","hits":"1","order":"6505","possible_hits":"1",},
{"lineNum":"   86","line":"    }"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    pub fn hasAccessTo(self: InferContext, ty: Type.Ptr, vis: Visibility) bool {","class":"lineCov","hits":"1","order":"6465","possible_hits":"1",},
{"lineNum":"   89","line":"        return switch (vis) {","class":"lineCov","hits":"4","order":"6466","possible_hits":"4",},
{"lineNum":"   90","line":"            .Public => true,","class":"lineCov","hits":"1","order":"6467","possible_hits":"1",},
{"lineNum":"   91","line":"            .Protected => self.hasProtectedAccessTo(ty),","class":"lineCov","hits":"1","order":"6475","possible_hits":"1",},
{"lineNum":"   92","line":"            .Private => self.hasPrivateAccessTo(ty),","class":"lineCov","hits":"1","order":"6498","possible_hits":"1",},
{"lineNum":"   93","line":"        };"},
{"lineNum":"   94","line":"    }"},
{"lineNum":"   95","line":"};"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"test \"can create a \'None\' InferContext\" {","class":"lineCov","hits":"2","order":"6434","possible_hits":"2",},
{"lineNum":"   98","line":"    const ctx = InferContext.none(null);","class":"lineCov","hits":"1","order":"6435","possible_hits":"1",},
{"lineNum":"   99","line":"    try std.testing.expectEqual(InferContext.Variant.None, ctx.getType());","class":"lineCov","hits":"1","order":"6436","possible_hits":"1",},
{"lineNum":"  100","line":"}"},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"test \"can create a \'New\' InferContext\" {","class":"lineCov","hits":"2","order":"6437","possible_hits":"2",},
{"lineNum":"  103","line":"    const ctx = InferContext.new(null);","class":"lineCov","hits":"1","order":"6438","possible_hits":"1",},
{"lineNum":"  104","line":"    try std.testing.expectEqual(InferContext.Variant.New, ctx.getType());","class":"lineCov","hits":"1","order":"6443","possible_hits":"1",},
{"lineNum":"  105","line":"}"},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"test \"can create a \'Class\' InferContext\" {","class":"lineCov","hits":"2","order":"6444","possible_hits":"2",},
{"lineNum":"  108","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"6445","possible_hits":"1",},
{"lineNum":"  109","line":"    const ctx = InferContext.class(null, &num);","class":"lineCov","hits":"1","order":"6446","possible_hits":"1",},
{"lineNum":"  110","line":"    try std.testing.expectEqual(InferContext.Variant.Class, ctx.getType());","class":"lineCov","hits":"1","order":"6451","possible_hits":"1",},
{"lineNum":"  111","line":"    try std.testing.expectEqual(&num, ctx.data.Class);","class":"lineCov","hits":"2","order":"6452","possible_hits":"2",},
{"lineNum":"  112","line":"}"},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"test \"only \'New\' InferContext is constructible\" {","class":"lineCov","hits":"2","order":"6453","possible_hits":"2",},
{"lineNum":"  115","line":"    const newCtx = InferContext.new(null);","class":"lineCov","hits":"1","order":"6454","possible_hits":"1",},
{"lineNum":"  116","line":"    const noneCtx = InferContext.none(null);","class":"lineCov","hits":"1","order":"6455","possible_hits":"1",},
{"lineNum":"  117","line":"    const childCtx = InferContext.none(&newCtx);","class":"lineCov","hits":"1","order":"6456","possible_hits":"1",},
{"lineNum":"  118","line":"    try std.testing.expect(newCtx.isConstructible());","class":"lineCov","hits":"1","order":"6457","possible_hits":"1",},
{"lineNum":"  119","line":"    try std.testing.expect(!noneCtx.isConstructible());","class":"lineCov","hits":"1","order":"6458","possible_hits":"1",},
{"lineNum":"  120","line":"    try std.testing.expect(!childCtx.isConstructible());","class":"lineCov","hits":"1","order":"6459","possible_hits":"1",},
{"lineNum":"  121","line":"}"},
{"lineNum":"  122","line":""},
{"lineNum":"  123","line":"test \"all contexts can access public members\" {","class":"lineCov","hits":"2","order":"6460","possible_hits":"2",},
{"lineNum":"  124","line":"    const c0 = Type.newClass(","class":"lineCov","hits":"1","order":"6462","possible_hits":"1",},
{"lineNum":"  125","line":"        Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"6461","possible_hits":"1",},
{"lineNum":"  126","line":"    );"},
{"lineNum":"  127","line":"    const ctx = InferContext.none(null);","class":"lineCov","hits":"1","order":"6463","possible_hits":"1",},
{"lineNum":"  128","line":"    try std.testing.expect(ctx.hasAccessTo(&c0, .Public));","class":"lineCov","hits":"1","order":"6464","possible_hits":"1",},
{"lineNum":"  129","line":"}"},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"test \"the local class and subclasses can access protected members\" {","class":"lineCov","hits":"2","order":"6468","possible_hits":"2",},
{"lineNum":"  132","line":"    const c0 = Type.newClass(","class":"lineCov","hits":"1","order":"6470","possible_hits":"1",},
{"lineNum":"  133","line":"        Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"6469","possible_hits":"1",},
{"lineNum":"  134","line":"    );"},
{"lineNum":"  135","line":"    const c1 = Type.newClass(","class":"lineCov","hits":"1","order":"6472","possible_hits":"1",},
{"lineNum":"  136","line":"        Type.ClassType.new(&c0, \"B\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"6471","possible_hits":"1",},
{"lineNum":"  137","line":"    );"},
{"lineNum":"  138","line":""},
{"lineNum":"  139","line":"    const ctx0 = InferContext.class(null, &c0);","class":"lineCov","hits":"1","order":"6473","possible_hits":"1",},
{"lineNum":"  140","line":"    try std.testing.expect(ctx0.hasAccessTo(&c0, .Protected));","class":"lineCov","hits":"1","order":"6474","possible_hits":"1",},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"    const ctx1 = InferContext.class(null, &c1);","class":"lineCov","hits":"1","order":"6480","possible_hits":"1",},
{"lineNum":"  143","line":"    try std.testing.expect(ctx1.hasAccessTo(&c0, .Protected));","class":"lineCov","hits":"1","order":"6481","possible_hits":"1",},
{"lineNum":"  144","line":"    try std.testing.expect(ctx1.hasAccessTo(&c1, .Protected));","class":"lineCov","hits":"1","order":"6482","possible_hits":"1",},
{"lineNum":"  145","line":""},
{"lineNum":"  146","line":"    const ctx2 = InferContext.class(&ctx0, &c1);","class":"lineCov","hits":"1","order":"6483","possible_hits":"1",},
{"lineNum":"  147","line":"    try std.testing.expect(ctx2.hasAccessTo(&c0, .Protected));","class":"lineCov","hits":"1","order":"6484","possible_hits":"1",},
{"lineNum":"  148","line":"    try std.testing.expect(ctx2.hasAccessTo(&c1, .Protected));","class":"lineCov","hits":"1","order":"6485","possible_hits":"1",},
{"lineNum":"  149","line":""},
{"lineNum":"  150","line":"    const ctx3 = InferContext.none(null);","class":"lineCov","hits":"1","order":"6486","possible_hits":"1",},
{"lineNum":"  151","line":"    try std.testing.expect(!ctx3.hasAccessTo(&c0, .Protected));","class":"lineCov","hits":"1","order":"6487","possible_hits":"1",},
{"lineNum":"  152","line":"    try std.testing.expect(!ctx3.hasAccessTo(&c1, .Protected));","class":"lineCov","hits":"1","order":"6490","possible_hits":"1",},
{"lineNum":"  153","line":"}"},
{"lineNum":"  154","line":""},
{"lineNum":"  155","line":"test \"only the local class can access private members\" {","class":"lineCov","hits":"2","order":"6491","possible_hits":"2",},
{"lineNum":"  156","line":"    const c0 = Type.newClass(","class":"lineCov","hits":"1","order":"6493","possible_hits":"1",},
{"lineNum":"  157","line":"        Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"6492","possible_hits":"1",},
{"lineNum":"  158","line":"    );"},
{"lineNum":"  159","line":"    const c1 = Type.newClass(","class":"lineCov","hits":"1","order":"6495","possible_hits":"1",},
{"lineNum":"  160","line":"        Type.ClassType.new(&c0, \"B\", &[_]Type.ClassType.Member{}),","class":"lineCov","hits":"1","order":"6494","possible_hits":"1",},
{"lineNum":"  161","line":"    );"},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"    const ctx0 = InferContext.class(null, &c0);","class":"lineCov","hits":"1","order":"6496","possible_hits":"1",},
{"lineNum":"  164","line":"    try std.testing.expect(ctx0.hasAccessTo(&c0, .Private));","class":"lineCov","hits":"1","order":"6497","possible_hits":"1",},
{"lineNum":"  165","line":""},
{"lineNum":"  166","line":"    const ctx1 = InferContext.class(null, &c1);","class":"lineCov","hits":"1","order":"6502","possible_hits":"1",},
{"lineNum":"  167","line":"    try std.testing.expect(!ctx1.hasAccessTo(&c0, .Private));","class":"lineCov","hits":"1","order":"6503","possible_hits":"1",},
{"lineNum":"  168","line":"    try std.testing.expect(ctx1.hasAccessTo(&c1, .Private));","class":"lineCov","hits":"1","order":"6506","possible_hits":"1",},
{"lineNum":"  169","line":""},
{"lineNum":"  170","line":"    const ctx2 = InferContext.class(&ctx0, &c1);","class":"lineCov","hits":"1","order":"6507","possible_hits":"1",},
{"lineNum":"  171","line":"    try std.testing.expect(ctx2.hasAccessTo(&c0, .Private));","class":"lineCov","hits":"1","order":"6508","possible_hits":"1",},
{"lineNum":"  172","line":"    try std.testing.expect(ctx2.hasAccessTo(&c1, .Private));","class":"lineCov","hits":"1","order":"6510","possible_hits":"1",},
{"lineNum":"  173","line":""},
{"lineNum":"  174","line":"    const ctx3 = InferContext.none(null);","class":"lineCov","hits":"1","order":"6511","possible_hits":"1",},
{"lineNum":"  175","line":"    try std.testing.expect(!ctx3.hasAccessTo(&c0, .Private));","class":"lineCov","hits":"1","order":"6512","possible_hits":"1",},
{"lineNum":"  176","line":"    try std.testing.expect(!ctx3.hasAccessTo(&c1, .Private));","class":"lineCov","hits":"1","order":"6513","possible_hits":"1",},
{"lineNum":"  177","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:51:54", "instrumented" : 89, "covered" : 88,};
var merged_data = [];
